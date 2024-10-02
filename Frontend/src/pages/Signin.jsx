import React, { useState, useEffect } from 'react';
import { Input } from '../components/ui/Input';
import { Label } from '../components/ui/Label';
import { TypewriterEffectSmooth } from '../components/ui/TypeWritter';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../hooks/UseAuth';
import Alert from '../components/global/Alert';
import Loader from '../components/global/Loader'; // Importing Loader component

const Signin = () => {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });
  const [username, setUsername] = useState(''); // Username state
  const [password, setPassword] = useState(''); // Password state
  const auth = useAuth();
  const navigate = useNavigate();
  const words = [{ text: 'Welcome to Questor-AI again!', className: 'text-red-500' }];

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Start loading

    // Create a payload object for sending username and password in JSON format
    const payload = {
      username,
      password,
    };

    try {
      const res = await axios.post(`${import.meta.env.VITE_REACT_BASE_URL}api/v1/user/signin`, payload, {
        headers: { 'Content-Type': 'application/json' },
      });


      // Store token and user data using AuthContext
      await auth.login(res.data);

      setAlert({ show: true, message: 'Signin Successful!', type: 'success' });
      navigate("/dashboard"); // Navigate to dashboard after successful signin
    } catch (error) {
      console.error("Signin Error:", error); // Log error for debugging
      setAlert({ show: true, message: 'Signin Failed! Try Again.', type: 'error' });
    } finally {
      setLoading(false); // Stop loading in both success and error cases
    }
  };

  useEffect(() => {
    if (auth?.user) {
      navigate("/dashboard");
    }
  }, [auth?.user, navigate]);

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-800 to-black flex flex-col items-center justify-start'>
      {/* Show full-screen loader if loading */}
      {loading && <Loader />} 

      {/* Alert */}
      {alert.show && <Alert type={alert.type} message={alert.message} onClose={() => setAlert({ show: false })} />}

      {/* Typewriter Effect at the Top */}
      <div className='mt-12 text-center'>
        <TypewriterEffectSmooth words={words} className="text-center text-white text-4xl md:text-5xl font-bold" />
      </div>

      {/* Sign In Form */}
      <div className='mt-8 flex flex-col w-[90vw] md:w-[50vw] lg:w-[35vw] bg-gray-900 p-8 rounded-lg shadow-lg'>
        <h1 className='text-3xl md:text-5xl font-bold text-white text-center mb-8'>Sign In</h1>

        <form onSubmit={handleSubmit} className='space-y-6'>
          {/* Username Field */}
          <div>
            <Label htmlFor="username" className="block text-white text-sm font-medium">Username</Label>
            <Input 
              type="text" 
              id="username" 
              name="username" 
              placeholder="Enter your username"
              value={username} // Bind the input value to username state
              onChange={(e) => setUsername(e.target.value)} // Update username state on input change
              className="mt-1 block w-full bg-gray-800 border border-gray-600 rounded-md shadow-sm text-white p-3 focus:ring-indigo-500 focus:border-indigo-500"
              required 
            />
          </div>

          {/* Password Field */}
          <div>
            <Label htmlFor="password" className="block text-white text-sm font-medium">Password</Label>
            <Input 
              type="password" 
              id="password" 
              name="password" 
              placeholder="Enter your password"
              value={password} // Bind the input value to password state
              onChange={(e) => setPassword(e.target.value)} // Update password state on input change
              className="mt-1 block w-full bg-gray-800 border border-gray-600 rounded-md shadow-sm text-white p-3 focus:ring-indigo-500 focus:border-indigo-500"
              required 
            />
          </div>

          {/* Submit Button */}
          <div className='flex justify-center'>
            <button 
              type="submit" 
              className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out"
            >
              {loading ? 'Loading...' : 'Sign In'}
            </button>
          </div>
        </form>

        {/* Sign Up Link */}
        <div className='mt-6 text-center'>
          <p className='text-white'>
            Don't have an account?{' '}
            <Link to="/signup" className="text-indigo-500 hover:text-indigo-300 font-medium">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signin;
