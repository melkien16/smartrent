import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Mail, Lock, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { mockUsers } from '../../data/mockUsers';

const LoginForm = ({ onToggleForm }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);

    try {
      // In a real app, this would be an API call
      // For demo purposes, we'll use mockUsers
      const user = Object.values(mockUsers).find(
        u => u.email === email && u.password === password
      );

      if (user) {
        await login(user);
        navigate('/dashboard');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in">
      <h2 className="mb-6 text-center text-2xl font-bold text-gray-900">Login to your account</h2>
      
      {error && (
        <div className="mb-4 flex items-center rounded-md bg-red-50 p-3 text-red-700">
          <AlertCircle size={16} className="mr-2 flex-shrink-0" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Mail size={16} className="text-gray-400" />
            </div>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input pl-10"
              placeholder="you@example.com"
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="mb-1 block text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Lock size={16} className="text-gray-400" />
            </div>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input pl-10 pr-10"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-500"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          <div className="mt-1 text-right">
            <a href="#" className="text-xs text-primary-600 hover:text-primary-500">
              Forgot password?
            </a>
          </div>
        </div>

        <button
          type="submit"
          className="btn-primary w-full"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <div className="text-center text-sm">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <button
              type="button"
              onClick={onToggleForm}
              className="font-medium text-primary-600 hover:text-primary-500"
            >
              Sign up
            </button>
          </p>
        </div>
      </form>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray-500">Demo credentials</span>
          </div>
        </div>
        <p className="mt-2 text-center text-xs text-gray-500">
          Demo User: <span className="font-medium">demo@smartrent.com</span> / <span className="font-medium">demo123</span>
          <br />
          Admin User: <span className="font-medium">admin@smartrent.com</span> / <span className="font-medium">admin123</span>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;