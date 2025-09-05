'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useFetch } from '@/hooks/useFetch';

export const SignupForm = ({ onToggleMode, onSuccess }) => {
    const { signUp } = useAuth();
    const [touched, setTouched] = useState({
        email: false,
        password: false,
        confirmPassword: false,
        firstName: false,
        lastName: false,
    });
    const signupHelper = async(formData) => {
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
    }
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
        fetchFunction: () => signupHelper(formData),
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

    const handleBlur = (field) => {
        setTouched(prev => ({ ...prev, [field]: true }));
    };

    const isFormValid = () => {
        return (
            formData.email &&
            /\S+@\S+\.\S+/.test(formData.email) &&
            formData.password &&
            formData.confirmPassword &&
            formData.firstName &&
            formData.lastName &&
            formData.password === formData.confirmPassword &&
            formData.password.length >= 6
        );
    };

    return (
        <div className="max-w-md mx-auto text-emerald-600 bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
                Create Account
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* First + Last Name */}
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
                            onBlur={() => handleBlur("firstName")}
                            className={`w-full px-3 py-2 border text-emerald-600 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent ${touched.firstName && !formData.firstName ? "border-red-400" : "border-gray-300"
                                }`}
                            placeholder="Sahil"
                        />
                        {touched.firstName && !formData.firstName && (
                            <p className="text-red-500 text-xs mt-1">First name is required</p>
                        )}
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
                            onBlur={() => handleBlur("lastName")}
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent ${touched.lastName && !formData.lastName ? "border-red-400" : "border-gray-300"
                                }`}
                            placeholder="Ahmad"
                        />
                        {touched.lastName && !formData.lastName && (
                            <p className="text-red-500 text-xs mt-1">Last name is required</p>
                        )}
                    </div>
                </div>

                {/* Email */}
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
                        onBlur={() => handleBlur("email")}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${touched.email && !/\S+@\S+\.\S+/.test(formData.email)
                                ? "border-red-400"
                                : "border-gray-300"
                            }`}
                        placeholder="john@example.com"
                    />
                    {touched.email && !/\S+@\S+\.\S+/.test(formData.email) && (
                        <p className="text-red-500 text-xs mt-1">Enter a valid email</p>
                    )}
                </div>

                {/* Password */}
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
                        onBlur={() => handleBlur("password")}
                        minLength={6}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent ${touched.password && formData.password.length < 6
                                ? "border-red-400"
                                : "border-gray-300"
                            }`}
                        placeholder="Minimum 6 characters"
                    />
                    {touched.password && formData.password.length < 6 && (
                        <p className="text-red-500 text-xs mt-1">Password must be at least 6 characters</p>
                    )}
                </div>

                {/* Confirm Password */}
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
                        onBlur={() => handleBlur("confirmPassword")}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent ${touched.confirmPassword &&
                                formData.confirmPassword &&
                                formData.password !== formData.confirmPassword
                                ? "border-red-400"
                                : "border-gray-300"
                            }`}
                        placeholder="Confirm your password"
                    />
                    {touched.confirmPassword &&
                        formData.confirmPassword &&
                        formData.password !== formData.confirmPassword && (
                            <p className="text-red-500 text-xs mt-1">Passwords do not match</p>
                        )}
                </div>

                {/* Error from API */}
                {error && (
                    <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm">
                        {error.message || 'Signup failed. Please try again.'}
                    </div>
                )}

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading || !isFormValid()}
                    className={`w-full py-2 px-4 rounded-md font-medium ${loading || !isFormValid()
                        ? 'bg-gray-300 cursor-not-allowed'
                        : 'bg-emerald-600 hover:bg-emerald-700'
                        } text-white transition duration-200`}
                >
                    {loading ? 'Creating Account...' : 'Create Account'}
                </button>
            </form>

            <p className="text-center mt-4 text-sm text-gray-600">
                Already have an account?{' '}
                <button
                    onClick={onToggleMode}
                    className="text-emerald-600 hover:underline font-medium"
                >
                    Sign in here
                </button>
            </p>
        </div>
    );
};
