export async function askGemini(userInput) {
    const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || process.env.REACT_APP_GEMINI_API_KEY;
  
    let enhancedPrompt = '';
  
    // Basic prompt engineering based on intent
    if (userInput.toLowerCase().includes('keyword')) {
      enhancedPrompt = `Suggest ATS-friendly resume keywords for the following job role or description:\n\n"${userInput}"\n\nProvide a bullet-point list.`;
    } else if (userInput.toLowerCase().includes('rephrase') || userInput.toLowerCase().includes('improve')) {
      enhancedPrompt = `Rephrase the following sentence to be more effective and ATS-friendly in a resume:\n\n"${userInput}"`;
    } else {
      enhancedPrompt = `You're a resume assistant bot. Reply concisely and clearly to help improve resume writing. Here's the user query:\n"${userInput}"`;
    }
  
    try {
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: enhancedPrompt }] }]
        })
      });
  
      const data = await res.json();
      if (!res.ok) {
        console.error("Gemini API error response:", data);
        return data.error?.message || "Error contacting Gemini";
      }
  
      return data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response from Gemini.";
    } catch (error) {
      console.error("Gemini API network error:", error);
      return "Error contacting Gemini";
    }
  }
  