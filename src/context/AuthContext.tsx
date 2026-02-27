import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Session, User } from '@supabase/supabase-js';

type AuthContextType = {
    session: Session | null;
    user: (User & { role?: string; username?: string; avatar_url?: string }) | null;
    loading: boolean;
    signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
    session: null,
    user: null,
    loading: true,
    signOut: async () => { },
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [session, setSession] = useState<Session | null>(null);
    const [user, setUser] = useState<{ id: string; role?: string; username?: string; avatar_url?: string } & User | null>(null);
    const [loading, setLoading] = useState(true);

    const enrichUserWithRole = async (authUser: User | null) => {
        if (!authUser) {
            setUser(null);
            return;
        }

        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('role, username, avatar_url')
                .eq('id', authUser.id)
                .single();

            if (data && !error) {
                setUser({ ...authUser, role: data.role, username: data.username, avatar_url: data.avatar_url });
            } else {
                setUser(authUser); // fallback a usuário normal sem cargo
            }
        } catch (e) {
            setUser(authUser);
        }
    };

    useEffect(() => {
        // Check active sessions and sets the user
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            enrichUserWithRole(session?.user ?? null).finally(() => {
                setLoading(false);
            });
        });

        // Listen for changes on auth state (logged in, signed out, etc.)
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            enrichUserWithRole(session?.user ?? null).finally(() => {
                setLoading(false);
            });
        });

        return () => subscription.unsubscribe();
    }, []);

    const signOut = async () => {
        await supabase.auth.signOut();
    };

    return (
        <AuthContext.Provider value={{ session, user, loading, signOut }}>
            {loading ? (
                <div className="h-screen w-full flex items-center justify-center bg-background">
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-muted-foreground animate-pulse font-medium">Carregando Juntos pela Fibromialgia...</p>
                    </div>
                </div>
            ) : (
                children
            )}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
