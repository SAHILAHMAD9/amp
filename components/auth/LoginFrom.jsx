'use client';

import { useState } from 'react';
import { useFetch } from '@/hooks/useFetch';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export const LoginForm = ({ onToggleMode, onSuccess }) => {
    const { signIn } = useAuth();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [touched, setTouched] = useState({ email: false, password: false });
    const [submitted, setSubmitted] = useState(false);

    const loginHelper = async ({ email, password }) => {
            const result = await signIn(email, password);
            if (result.error) throw result.error;
            onSuccess?.();
        toast.success("LOgin Succesfull");
            return result.data;
        }
    const {
        loading,
        error,
        reFetch: handleLogin,
        resetFunction
    } = useFetch({
        fetchFunction: () => loginHelper(formData) ,
        autoFetch: false
    });

    // Validation function
    function validateForm({ email, password }) {
        const errors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email) errors.email = "Email is required";
        else if (!emailRegex.test(email)) errors.email = "Invalid email format";

        if (!password) errors.password = "Password is required";
        else if (password.length < 6) errors.password = "Password must be at least 6 characters long";

        return {
            isValid: Object.keys(errors).length === 0,
            errors,
        };
    }

    const validation = validateForm(formData);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validation.isValid) return;
        setSubmitted(true); // mark form as submitted
        resetFunction();
        handleLogin();
    };

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleBlur = (e) => {
        setTouched(prev => ({
            ...prev,
            [e.target.name]: true
        }));
    };

    const showError = (field) =>
        (touched[field] || submitted) && validation.errors[field];

    return (
        <div className="max-w-md mx-auto text-emerald-600 bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Sign In</h2>

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
                        onBlur={handleBlur}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent ${showError("email") ? "border-red-500" : "border-emerald-600"
                            }`}
                        placeholder="Enter your email"
                    />
                    {showError("email") && (
                        <p className="text-red-600 text-sm mt-1">{validation.errors.email}</p>
                    )}
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
                        onBlur={handleBlur}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent ${showError("password") ? "border-red-500" : "border-emerald-600"
                            }`}
                        placeholder="Enter your password"
                    />
                    {showError("password") && (
                        <p className="text-red-600 text-sm mt-1">{validation.errors.password}</p>
                    )}
                </div>

                {error && (
                    <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm">
                        {error.message || 'Login failed. Please try again.'}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={!validation.isValid || loading}
                    className={`w-full py-2 px-4 rounded-md font-medium ${!validation.isValid || loading
                            ? 'bg-gray-300 cursor-not-allowed'
                            : 'bg-emerald-600 hover:bg-emerald-700'
                        } text-white transition duration-200`}
                >
                    {loading ? 'Signing In...' : 'Sign In'}
                </button>
            </form>

            <p className="text-center mt-4 text-sm text-gray-600">
                Don't have an account?{' '}
                <button onClick={onToggleMode} className="text-emerald-600 hover:underline font-medium">
                    Sign up here
                </button>
            </p>
        </div>
    );
};
