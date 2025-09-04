// lib/supabase.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Check if environment variables are set
if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Supabase environment variables are not set!');
    // You might want to throw an error here or handle this case
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper to get user profile along with auth data
export const getUserWithProfile = async (userId) => {
    try {
        const { data, error } = await supabase
            .from('user_profiles')
            .select('*')
            .eq('id', userId)
            .single();

        if (error && error.code !== 'PGRST116') throw error;

        return { data, error };
    } catch (error) {
        console.error('Error fetching user profile:', error);
        return { data: null, error };
    }
};

// Helper to check if user has specific role/permission
export const hasPermission = (user, permission) => {
    if (!user) return false;

    // Get user roles from app_metadata or user_metadata
    const userRoles = user.app_metadata?.roles || [];
    const userPermissions = user.app_metadata?.permissions || [];

    // Implement your permission logic here
    // This is a simple example - you might want a more robust system
    return userPermissions.includes(permission);
};