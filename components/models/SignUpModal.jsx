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
import { Checkbox } from '@/components/ui/checkbox';
import { X, Eye, EyeOff, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const SignUpModal = ({
    isOpen,
    onClose,
    onSwitchToSignIn
}) => {
    const { signUp } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        agreeToTerms: false
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.agreeToTerms) {
            toast.error('Please agree to the Terms of Service and Privacy Policy');
            return;
        }

        setLoading(true);

        const { error } = await signUp(formData.email, formData.password, {
            full_name: formData.fullName,
        });

        if (error) {
            toast.error(error.message || 'Sign up failed');
        } else {
            onClose();
            setFormData({ fullName: '', email: '', password: '', agreeToTerms: false });
        }

        setLoading(false);
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    function validateForm({ email, password,agreeToTerms }) {
        const errors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email) errors.email = "Email is required";
        else if (!emailRegex.test(email)) errors.email = "Invalid email format";

        if (!password) errors.password = "Password is required";
        else if (password.length < 6) errors.password = "Password must be at least 6 characters long";

        if (!agreeToTerms) errors.agreeToTerms = "Please agree to the Terms of Service and Privacy Policy";

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
                        Join APM Career
                    </DialogTitle>
                    <button
                        onClick={onClose}
                        className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-all hover:opacity-100 hover:scale-110"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="signup-fullname">Full Name</Label>
                        <Input
                            id="signup-fullname"
                            placeholder="Enter your full name"
                            value={formData.fullName}
                            onChange={(e) => handleInputChange('fullName', e.target.value)}
                            required
                            className="transition-all duration-200 focus:scale-[1.02]"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="signup-email">Email</Label>
                        <Input
                            id="signup-email"
                            type="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            required
                            className="transition-all duration-200 focus:scale-[1.02]"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="signup-password">Password</Label>
                        <div className="relative">
                            <Input
                                id="signup-password"
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
                                className="absolute right-3 text-emerald-700 top-1/2 transform -translate-y-1/2 hover:scale-110 transition-transform"
                            >
                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="terms"
                            checked={formData.agreeToTerms}
                            onCheckedChange={(checked) =>
                                handleInputChange('agreeToTerms', checked)
                            }
                            className="transition-all hover:scale-110"
                        />
                        <label
                            htmlFor="terms"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                        >
                            I agree to the Terms of Service and Privacy Policy
                        </label>
                    </div>

                    <Button
                        type="submit"
                        className="w-full bg-emerald-600 hover:bg-emerald-700 transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
                        disabled={!validation.isValid || loading}
                    >
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Creating Account...
                            </>
                        ) : (
                            'Create Account'
                        )}
                    </Button>

                    <p className="text-center text-sm text-gray-600">
                        Already have an account?{' '}
                        <button
                            type="button"
                            onClick={onSwitchToSignIn}
                            className="text-emerald-600 hover:underline font-medium transition-all hover:scale-105"
                        >
                            Sign in
                        </button>
                    </p>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default SignUpModal;