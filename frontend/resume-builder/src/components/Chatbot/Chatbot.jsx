import React, { useState, useRef, useEffect } from 'react';
import { askGemini } from '../../utils/gemini';

// Icons (minimal SVGs for minimize/expand and clipboard)
const MinimizeIcon = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" d="M5 12h14"/></svg>
);
const ExpandIcon = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" d="M12 5v14"/><path stroke="currentColor" strokeWidth="2" d="M5 12h14"/></svg>
);
const ClipboardIcon = () => (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><rect x="7" y="4" width="10" height="16" rx="2" stroke="currentColor" strokeWidth="2"/><path d="M9 2h6v4H9z" stroke="currentColor" strokeWidth="2"/></svg>
);

const Chatbot = () => {
  // Draggable state
  const [position, setPosition] = useState({ x: 40, y: 120 });
  const [dragging, setDragging] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const botRef = useRef(null);

  // Minimize state
  const [minimized, setMinimized] = useState(false);

  // Chat state
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi! I can help you improve your resume. Ask me for keywords, rephrasing, or tips!' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const [copiedIdx, setCopiedIdx] = useState(null);

  // Drag handlers
  const onMouseDown = (e) => {
    setDragging(true);
    const rect = botRef.current.getBoundingClientRect();
    dragOffset.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
    document.body.style.userSelect = 'none';
  };
  useEffect(() => {
    const onMouseMove = (e) => {
      if (!dragging) return;
      setPosition({
        x: e.clientX - dragOffset.current.x,
        y: e.clientY - dragOffset.current.y,
      });
    };
    const onMouseUp = () => {
      setDragging(false);
      document.body.style.userSelect = '';
    };
    if (dragging) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [dragging]);

  // Chat send handler
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = { sender: 'user', text: input };
    setMessages((msgs) => [...msgs, userMsg]);
    setInput('');
    setLoading(true);
    try {
      const prompt = input;
      const reply = await askGemini(prompt);
      setMessages((msgs) => [...msgs, { sender: 'bot', text: reply }]);
    } catch {
      setMessages((msgs) => [...msgs, { sender: 'bot', text: 'Sorry, something went wrong.' }]);
    } finally {
      setLoading(false);
    }
  };

  // Auto-scroll to bottom
  const chatEndRef = useRef(null);
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, minimized]);

  // Focus input on expand
  useEffect(() => {
    if (!minimized) inputRef.current?.focus();
  }, [minimized]);

  // Copy handler
  const handleCopy = async (text, idx) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIdx(idx);
      setTimeout(() => setCopiedIdx(null), 1200);
    } catch {
      // fallback or error
    }
  };

  return (
    <div
      ref={botRef}
      className={`fixed z-50 shadow-lg rounded-xl bg-white border border-gray-200 flex flex-col transition-all duration-200 ${minimized ? 'w-72 h-12' : 'w-80 h-[32rem]'}`}
      style={{ left: position.x, top: position.y, cursor: dragging ? 'grabbing' : 'default' }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-2 bg-blue-600 rounded-t-xl cursor-move text-white select-none"
        onMouseDown={onMouseDown}
      >
        <span className="font-semibold">Resume Chatbot</span>
        <button
          className="ml-2 p-1 rounded hover:bg-blue-700 focus:outline-none"
          onClick={() => setMinimized((m) => !m)}
          tabIndex={0}
          aria-label={minimized ? 'Expand chatbot' : 'Minimize chatbot'}
        >
          {minimized ? <ExpandIcon /> : <MinimizeIcon />}
        </button>
      </div>
      {/* Chat body */}
      {!minimized && (
        <>
          <div className="flex-1 overflow-y-auto px-3 py-2 bg-gray-50" style={{ minHeight: '0' }}>
            {messages.map((msg, i) => (
              <div key={i} className={`mb-2 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className="relative flex items-center group max-w-[80%]">
                  <div
                    className={`px-3 py-2 rounded-lg text-sm whitespace-pre-line ${
                      msg.sender === 'user'
                        ? 'bg-blue-500 text-white rounded-br-none'
                        : 'bg-gray-200 text-gray-900 rounded-bl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                  {/* Copy button for bot messages */}
                  {msg.sender === 'bot' && (
                    <button
                      className="ml-2 p-1 rounded hover:bg-gray-300 focus:outline-none transition relative"
                      title="Copy"
                      onClick={() => handleCopy(msg.text, i)}
                      tabIndex={0}
                    >
                      <ClipboardIcon />
                      {copiedIdx === i && (
                        <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-black text-white text-xs rounded px-2 py-0.5 pointer-events-none select-none">Copied!</span>
                      )}
                    </button>
                  )}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
          {/* Input */}
          <form onSubmit={sendMessage} className="p-2 border-t bg-white flex gap-2">
            <input
              ref={inputRef}
              type="text"
              className="flex-1 px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200 text-sm"
              placeholder="Ask about resume writing..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
              autoComplete="off"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 text-sm"
              disabled={loading || !input.trim()}
            >
              {loading ? '...' : 'Send'}
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default Chatbot; 