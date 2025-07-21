import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';

function CreateResumeForm() {
  const [title, setTitle] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleCreateResume = async (e) => {
    e.preventDefault();
    if (!title) {
      setError("Please enter resume title");
      return;
    }

    setError("");
    try {
      const response = await axiosInstance.post(API_PATHS.RESUME.CREATE, {
        title,
      });
      if (response.data?._id) {
        navigate(`/resume/${response.data._id}`);
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className='flex items-center justify-center p-4'>
      <div className='w-full max-w-md bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden'>
        <div className='bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6'>
          <h3 className='text-xl font-bold text-white'>Create New Resume</h3>
          <p className='text-blue-100 text-sm mt-2'>
            Give your resume a title to get started. You can edit all details later.
          </p>
        </div>

        <form onSubmit={handleCreateResume} className='px-8 py-6 space-y-6'>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>Resume Title</label>
            <input
              value={title}
              onChange={({ target }) => setTitle(target.value)}
              placeholder="Eg: Mike's Resume"
              type="text"
              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200'
            />
          </div>

          {error && (
            <div className='bg-red-50 border border-red-200 rounded-lg p-3'>
              <p className='text-red-600 text-sm flex items-center'>
                <svg className='w-4 h-4 mr-2 flex-shrink-0' fill='currentColor' viewBox='0 0 20 20'>
                  <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z' clipRule='evenodd' />
                </svg>
                {error}
              </p>
            </div>
          )}

          <button
            type="submit"
            className='w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:scale-95'
          >
            Create Resume
          </button>
        </form>

        <div className='px-8 py-4 bg-gray-50 border-t border-gray-200'>
          <p className='text-xs text-gray-500 text-center'>
            Your resume will be saved automatically as you work
          </p>
        </div>
      </div>
    </div>
  );
}

export default CreateResumeForm;
