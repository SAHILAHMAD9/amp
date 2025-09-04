'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useFetch } from '@/hooks/useFetch';

export const UserProfile = () => {
    const { user, signOut } = useAuth();

    const {
        loading: signOutLoading,
        reFetch: handleSignOut,
        resetFunction
    } = useFetch({
        fetchFunction: async () => {
            const result = await signOut();
            if (result.error) throw result.error;
            return result;
        },
        autoFetch: false
    });

    const handleLogout = () => {
        resetFunction();
        handleSignOut();
    };

    if (!user) return null;

    return (
        <div className="bg-white rounded-lg shadow p-6 max-w-md mx-auto">
            <h2 className="text-xl font-semibold mb-4">Profile</h2>

            <div className="space-y-3">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <p className="text-gray-900">{user.email}</p>
                </div>

                {user.user_metadata?.full_name && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <p className="text-gray-900">{user.user_metadata.full_name}</p>
                    </div>
                )}

                <div>
                    <label className="block text-sm font-medium text-gray-700">User ID</label>
                    <p className="text-gray-500 text-sm font-mono">{user.id}</p>
                </div>
            </div>

            <button
                onClick={handleLogout}
                disabled={signOutLoading}
                className={`w-full mt-6 py-2 px-4 rounded-md font-medium ${signOutLoading
                        ? 'bg-gray-300 cursor-not-allowed'
                        : 'bg-red-600 hover:bg-red-700'
                    } text-white transition duration-200`}
            >
                {signOutLoading ? 'Signing Out...' : 'Sign Out'}
            </button>
        </div>
    );
};