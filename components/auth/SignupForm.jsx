'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useFetch } from '@/hooks/useFetch';

export const SignupForm = ({ onToggleMode, onSuccess }) => {
    const { signUp } = useAuth();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: ''
    });

    const {
        loading,
        error,
        reFetch: handleSignup,
        resetFunction
    } = useFetch({
        fetchFunction: async () => {
            if (formData.password !== formData.confirmPassword) {
                throw new Error('Passwords do not match');
            }

            const metadata = {
                first_name: formData.firstName,
                last_name: formData.lastName,
                full_name: `${formData.firstName} ${formData.lastName}`.trim()
            };

            const result = await signUp(formData.email, formData.password, metadata);
            if (result.error) throw result.error;
            onSuccess?.();
            return result.data;
        },
        autoFetch: false
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isFormValid()) return;
        resetFunction();
        handleSignup();
    };

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const isFormValid = () => {
        return formData.email &&
            formData.password &&
            formData.confirmPassword &&
            formData.firstName &&
            formData.password === formData.confirmPassword &&
            formData.password.length >= 6;
    };

    return (
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
                Create Account
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                            First Name
                        </label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="John"
                        />
                    </div>
                    <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                            Last Name
                        </label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Doe"
                        />
                    </div>
                </div>

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
                        placeholder="john@example.com"
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
                        minLength={6}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Minimum 6 characters"
                    />
                </div>

                <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${formData.confirmPassword && formData.password !== formData.confirmPassword
                                ? 'border-red-300'
                                : 'border-gray-300'
                            }`}
                        placeholder="Confirm your password"
                    />
                    {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                        <p className="text-red-500 text-xs mt-1">Passwords do not match</p>
                    )}
                </div>

                {error && (
                    <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm">
                        {error.message || 'Signup failed. Please try again.'}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading || !isFormValid()}
                    className={`w-full py-2 px-4 rounded-md font-medium ${loading || !isFormValid()
                            ? 'bg-gray-300 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700'
                        } text-white transition duration-200`}
                >
                    {loading ? 'Creating Account...' : 'Create Account'}
                </button>
            </form>

            <p className="text-center mt-4 text-sm text-gray-600">
                Already have an account?{' '}
                <button
                    onClick={onToggleMode}
                    className="text-blue-600 hover:underline font-medium"
                >
                    Sign in here
                </button>
            </p>
        </div>
    );
};