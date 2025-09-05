"use client";
import React, { createContext, useContext, useCallback, useState, useEffect, useMemo } from 'react';
import { supabase } from '@/lib/supabase'; // Your Supabase client
import { toast } from 'sonner';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);

    // Function to get the current session
    const getSession = useCallback(async () => {
        try {
            const { data: { session }, error } = await supabase.auth.getSession();
            if (error) throw error;
            return session;
        } catch (error) {
            console.error('Error getting session:', error);
            return null;
        }
    }, []);

    // Function to get the current user
    const getUser = useCallback(async () => {
        try {
            const { data: { user }, error } = await supabase.auth.getUser();
            if (error) throw error;
            return user;
        } catch (error) {
            console.error('Error getting user:', error);
            return null;
        }
    }, []);

    // Initialize auth state
    const initializeAuth = useCallback(async () => {
        try {
            setLoading(true);
            const [currentSession, currentUser] = await Promise.all([
                getSession(),
                getUser()
            ]);

            setSession(currentSession);
            setUser(currentUser);
        } catch (error) {
            console.error('Error initializing auth:', error);
            setSession(null);
            setUser(null);
        } finally {
            setLoading(false);
        }
    }, [getSession, getUser]);

    // Sign up function
    const signUp = useCallback(async (email, password, metadata = {}) => {
        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: metadata
                }
            });

            if (error) throw error;

            setSession(data.session);
            setUser(data.user);
            toast.info("Verify your email via the link we sent to your inbox.", {
                description: "Check spam/junk if you don't see it.",
            });
            return { user: data.user, session: data.session, error: null };
        } catch (error) {
            console.error('Sign up error:', error);
            return { user: null, session: null, error };
        }
    }, []);

    // Sign in function
    const signIn = useCallback(async (email, password) => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;

            setSession(data.session);
            setUser(data.user);

            return { user: data.user, session: data.session, error: null };
        } catch (error) {
            console.error('Sign in error:', error);
            return { user: null, session: null, error };
        }
    }, []);

    // Sign out function
    const signOut = useCallback(async () => {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;

            setSession(null);
            setUser(null);
            toast.success("Logged Out succesfully");
            return { error: null };
        } catch (error) {
            console.error('Sign out error:', error);
            return { error };
        }
    }, []);

    // Reset password function
    const resetPassword = useCallback(async (email) => {
        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/auth/update-password`,
            });

            if (error) throw error;

            return { error: null };
        } catch (error) {
            console.error('Password reset error:', error);
            return { error };
        }
    }, []);

    // Update password function
    const updatePassword = useCallback(async (newPassword) => {
        try {
            const { error } = await supabase.auth.updateUser({
                password: newPassword
            });

            if (error) throw error;

            return { error: null };
        } catch (error) {
            console.error('Password update error:', error);
            return { error };
        }
    }, []);

    // Update user metadata
    const updateUser = useCallback(async (updates) => {
        try {
            const { data, error } = await supabase.auth.updateUser(updates);

            if (error) throw error;

            setUser(data.user);

            return { user: data.user, error: null };
        } catch (error) {
            console.error('User update error:', error);
            return { user: null, error };
        }
    }, []);

    // Effect to initialize auth on mount
    useEffect(() => {
        initializeAuth();

        // Listen for auth changes
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange(async (event, session) => {
            console.log('Auth state changed:', event);

            if (event === 'SIGNED_IN') {
                setSession(session);
                setUser(session?.user ?? null);
            } else if (event === 'SIGNED_OUT') {
                setSession(null);
                setUser(null);
            } else if (event === 'USER_UPDATED') {
                const user = await getUser();
                setUser(user);
            } else if (event === 'TOKEN_REFRESHED') {
                setSession(session);
            }
        });

        return () => subscription.unsubscribe();
    }, [initializeAuth, getUser]);

    // Memoized context value to prevent unnecessary re-renders
    const contextValue = useMemo(() => ({
        user,
        session,
        loading,
        signUp,
        signIn,
        signOut,
        resetPassword,
        updatePassword,
        updateUser,
        isAuthenticated: !!user,
    }), [user, session, loading, signUp, signIn, signOut, resetPassword, updatePassword, updateUser]);

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};