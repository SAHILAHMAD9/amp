import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Supabase environment variables are not set!');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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

export const hasPermission = (user, permission) => {
    if (!user) return false;

    const userRoles = user.app_metadata?.roles || [];
    const userPermissions = user.app_metadata?.permissions || [];

    return userPermissions.includes(permission);
};