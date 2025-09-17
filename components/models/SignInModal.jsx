"use client";

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { X, Eye, EyeOff, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const SignInModal = ({
    isOpen,
    onClose,
    onSwitchToSignUp,
}) => {
    const { signIn, resetPassword } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const { error } = await signIn(formData.email, formData.password);

        if (error) {
            toast.error(error.message || 'Sign in failed');
        } else {
            toast.success('Welcome back!');
            onClose();
            setFormData({ email: '', password: '' });
        }

        setLoading(false);
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleForgetPasword = async (e) => {
        e.preventDefault();
        setLoading(true);

        const { error } = await resetPassword(formData.email);

        if (error) {
            toast.error(error.message || 'Failed to send reset email');
        } else {
            toast.success('Password reset email sent! Check your inbox.');
            onClose();
            setEmail('');
        }

        setLoading(false);
    };
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
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md animate-in fade-in-0 zoom-in-95 duration-300">
                <DialogHeader>
                    <DialogTitle className="text-center text-emerald-600 text-xl font-semibold">
                        Welcome 
                    </DialogTitle>
                    <button
                        onClick={onClose}
                        className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-all hover:opacity-100 hover:scale-110 hover:rotate-90"
                    >
                        <X className="h-4 w-4 " />
                    </button>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="signin-email">Email</Label>
                        <Input
                            id="signin-email"
                            type="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            required
                            className="transition-all duration-200 focus:scale-[1.02]"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="signin-password">Password</Label>
                        <div className="relative">
                            <Input
                                id="signin-password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={(e) => handleInputChange('password', e.target.value)}
                                required
                                className="pr-10 transition-all duration-200 focus:scale-[1.02]"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute text-emerald-700 right-3 top-1/2 transform -translate-y-1/2 hover:scale-110 transition-transform"
                            >
                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                        </div>
                    </div>

                    <Button
                        type="submit"
                        className="w-full bg-emerald-600 hover:bg-emerald-700 transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
                        disabled={!validation.isValid || loading}
                    >
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Signing In...
                            </>
                        ) : (
                            'Sign In'
                        )}
                    </Button>

                    <div className="text-center space-y-2">
                        <button
                            type="button"
                            disabled={!validation.isValid || loading}
                            onClick={handleForgetPasword}
                            className="text-sm text-emerald-600 hover:underline transition-all hover:scale-105"
                        >
                            Forgot Password?
                        </button>

                        <p className="text-sm text-gray-600">
                            Don't have an account?{' '}
                            <button
                                type="button"
                                onClick={onSwitchToSignUp}
                                className="text-emerald-600 hover:underline font-medium transition-all hover:scale-105"
                            >
                                Sign up
                            </button>
                        </p>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default SignInModal;
