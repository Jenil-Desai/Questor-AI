import React, { useState, useEffect } from 'react';
import { Input } from '../components/ui/Input';
import { Label } from '../components/ui/Label';
import { TypewriterEffectSmooth } from '../components/ui/TypeWritter';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import Alert from '../components/global/Alert';

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });
  const [formData, setFormData] = useState({
    username: '',
    fullname: '',
    email: '',
    password: '',
    type: 'student',
  }); // Store form data in state
  const auth = useAuth();
  const navigate = useNavigate();
  const words = [{ text: 'Build Question Paper With Questor-Ai!', className: 'text-red-500' }];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_REACT_BASE_URL}api/v1/user/signup`,
        formData,
        {
          headers: {
            'Content-Type': 'application/json', // Changed to JSON as we're using a JS object
          },
        }
      );
      setAlert({ show: true, message: 'Signup Successful!', type: 'success' });
      setLoading(false);
      navigate("/dashboard");
    } catch (error) {
      setAlert({ show: true, message: 'Signup Failed! Try Again.', type: 'error' });
      setLoading(false);
    }
  };

  useEffect(() => {
    if (auth?.user) {
      const data = decodeToken(auth?.user);
      if (data.userId) {
        navigate("/dashboard");
      }
    }
  }, [auth?.user, navigate]);

  return (
    <div>
      {alert.show && (
        <Alert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert({ show: false })}
        />
      )}
      <form onSubmit={handleSubmit}>
        <div className='flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-800 to-black'>
          <div className='text-center flex justify-center'>
            <TypewriterEffectSmooth words={words} className="text-center" />
          </div>
          <div className='flex flex-col w-[90vw] md:w-[50vw] lg:w-[35vw] bg-gray-900 p-8 rounded-lg shadow-lg'>
            <h1 className='text-3xl md:text-5xl font-bold text-white text-center mb-8'>
              Signup Form
            </h1>
            <div className='space-y-6'>
              <div>
                <Label htmlFor="username" className="block text-white text-sm font-medium">Username</Label>
                <Input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Enter your username"
                  className="mt-1 block w-full bg-gray-800 border border-gray-600 rounded-md shadow-sm text-white p-3"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="fullname" className="block text-white text-sm font-medium">Full Name</Label>
                <Input
                  type="text"
                  id="fullname"
                  name="fullname"
                  placeholder="Enter your full name"
                  className="mt-1 block w-full bg-gray-800 border border-gray-600 rounded-md shadow-sm text-white p-3"
                  value={formData.fullname}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="email" className="block text-white text-sm font-medium">Email</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  className="mt-1 block w-full bg-gray-800 border border-gray-600 rounded-md shadow-sm text-white p-3"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="password" className="block text-white text-sm font-medium">Password</Label>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  className="mt-1 block w-full bg-gray-800 border border-gray-600 rounded-md shadow-sm text-white p-3"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="type" className="block text-white text-sm font-medium">Type</Label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="mt-1 block w-full bg-gray-800 border border-gray-600 rounded-md shadow-sm text-white p-3"
                  required
                >
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                </select>
              </div>
              <div className='flex justify-center'>
                <button type="submit" className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out">
                  {loading ? 'Loading...' : 'Sign Up'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signup;
