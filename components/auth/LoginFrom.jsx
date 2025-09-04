'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useFetch } from '@/hooks/useFetch';

export const LoginForm = ({ onToggleMode, onSuccess }) => {
    const { signIn } = useAuth();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const {
        loading,
        error,
        reFetch: handleLogin,
        resetFunction
    } = useFetch({
        fetchFunction: async () => {
            const result = await signIn(formData.email, formData.password);
            if (result.error) throw result.error;
            onSuccess?.();
            return result.data;
        },
        autoFetch: false
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.email || !formData.password) return;
        resetFunction();
        handleLogin();
    };

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
                Sign In
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your email"
                    />
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your password"
                    />
                </div>

                {error && (
                    <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm">
                        {error.message || 'Login failed. Please try again.'}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={!formData.email || !formData.password}
                    className={`w-full py-2 px-4 rounded-md font-medium ${!formData.email || !formData.password
                            ? 'bg-gray-300 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700'
                        } text-white transition duration-200`}
                >
                    {loading ? 'Signing In...' : 'Sign In'}
                </button>
            </form>

            <p className="text-center mt-4 text-sm text-gray-600">
                Don't have an account?{' '}
                <button
                    onClick={onToggleMode}
                    className="text-blue-600 hover:underline font-medium"
                >
                    Sign up here
                </button>
            </p>
        </div>
    );
};
