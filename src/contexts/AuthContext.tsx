import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useProfile, Profile } from '@/hooks/useProfile';

type AppRole = 'admin' | 'reviewer' | 'company';

interface SignUpData {
  firstName: string;
  lastName: string;
  dataProcessingConsent?: boolean;
  consentTimestamp?: string;
  requestedRoles?: ('reviewer' | 'company')[];
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  profileLoading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, data: SignUpData) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  profile: Profile | null;
  roles: AppRole[];
  highestRole: AppRole | null;
  isAdmin: boolean;
  isReviewer: boolean;
  isCompany: boolean;
  activeRole: string | null;
  availableRoles: string[];
  requiresRoleSelection: boolean;
  setActiveRole: (role: string) => void;
  updateProfile: (data: Partial<Profile>) => Promise<{ data: any; error: any }>;
  resendVerificationEmail: () => Promise<{ error: Error | null }>;
  refreshProfile: () => Promise<void>;
  verifySession: () => Promise<{ valid: boolean; error?: string }>;
  refreshSession: () => Promise<{ success: boolean; error?: string }>;
}

// Create context with null as initial value instead of undefined
const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const queryClient = useQueryClient();
  
  // Use the useProfile hook to manage profile data (legacy profiles table)
  const { profile, loading: profileLoading, updateProfile: updateProfileData, refetch: refreshProfile } = useProfile(user?.id || null);

  // Set up auth state listener
  useEffect(() => {
    console.log('[Auth] Initializing auth listener');
    
    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        console.log('[Auth] State change:', event);
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        // Add small delay to ensure session context is fully established
        if (currentSession?.user) {
          setTimeout(() => {
            console.log('[Auth] Session context ready after state change');
          }, 100);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session: existingSession } }) => {
      console.log('[Auth] Initial session:', existingSession ? 'Found' : 'None');
      setSession(existingSession);
      setUser(existingSession?.user ?? null);
      setLoading(false);
      
      // Add small delay to ensure session context is fully established
      if (existingSession?.user) {
        setTimeout(() => {
          console.log('[Auth] Session context ready for initial profile fetch');
        }, 100);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        // Use generic error message to prevent user enumeration attacks
        // Don't differentiate between invalid credentials, non-existent accounts, or unverified emails
        return { error: new Error('Unable to sign in. Please check your credentials and ensure your email is verified.') };
      }

      return { error: null };
    } catch (error: any) {
      console.error('[Auth] Sign in failed');
      // Return generic error to prevent information leakage
      return { error: new Error('Unable to sign in. Please try again later.') };
    }
  };

  const signUp = async (email: string, password: string, data: SignUpData) => {
    try {
      // Check if email domain is institutional
      const emailDomain = email.toLowerCase().split('@')[1];
      const blockedDomains = [
        'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com',
        'live.com', 'msn.com', 'aol.com', 'icloud.com',
        'protonmail.com', 'mail.com', 'zoho.com', 'yandex.com',
        'gmx.com', 'inbox.com', 'fastmail.com', 'hushmail.com'
      ];
      
      if (blockedDomains.includes(emailDomain)) {
        return { error: new Error('Please use an institutional email address (e.g., university or company email).') };
      }
      
      const redirectUrl = `${window.location.origin}/`;
      
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            first_name: data.firstName,
            last_name: data.lastName,
            dataProcessingConsent: data.dataProcessingConsent,
            consentTimestamp: data.consentTimestamp,
            requested_roles: data.requestedRoles || [],
          },
        },
      });

      if (error) {
        // Provide user-friendly error messages
        if (error.message.includes('already registered')) {
          return { error: new Error('This email is already registered. Please sign in instead.') };
        }
        if (error.message.includes('email not confirmed')) {
          return { error: new Error('Please verify your email address before signing in.') };
        }
        return { error };
      }

      return { error: null };
    } catch (error: any) {
      console.error('[Auth] Sign up failed');
      return { error };
    }
  };

  const signOut = async () => {
    try {
      console.log('[Auth] Signing out...');
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('[Auth] Sign out error:', error.message);
      }

      // Clear all auth-related localStorage
      localStorage.removeItem('activeRole');
      localStorage.removeItem('dlinrt-auth-token');
      
      // Clear React Query cache to remove stale data
      queryClient.clear();
      
      console.log('[Auth] Sign out successful, localStorage and cache cleared');
      setUser(null);
      setSession(null);
    } catch (error) {
      console.error('[Auth] Sign out exception:', error);
      // Still clear state even on error
      localStorage.removeItem('activeRole');
      localStorage.removeItem('dlinrt-auth-token');
      queryClient.clear();
      setUser(null);
      setSession(null);
    }
  };

  const resendVerificationEmail = async () => {
    try {
      if (!user?.email) {
        return { error: new Error('No email address found') };
      }
      
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: user.email,
      });
      
      return { error };
    } catch (error: any) {
      return { error };
    }
  };

  const verifySession = async () => {
    try {
      const { data: { session: currentSession }, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('[Auth] Session verification error:', error);
        return { valid: false, error: error.message };
      }
      
      if (!currentSession) {
        console.warn('[Auth] No active session found');
        return { valid: false, error: 'No active session' };
      }
      
      // Check if session is expired
      const expiresAt = currentSession.expires_at;
      if (expiresAt && expiresAt * 1000 < Date.now()) {
        console.warn('[Auth] Session has expired');
        return { valid: false, error: 'Session expired' };
      }
      
      console.log('[Auth] Session is valid');
      return { valid: true };
    } catch (error: any) {
      console.error('[Auth] Session verification failed:', error);
      return { valid: false, error: error.message };
    }
  };

  const refreshSession = async () => {
    try {
      console.log('[Auth] Refreshing session...');
      const { data: { session: newSession }, error } = await supabase.auth.refreshSession();
      
      if (error) {
        console.error('[Auth] Session refresh error:', error);
        return { success: false, error: error.message };
      }
      
      if (newSession) {
        console.log('[Auth] Session refreshed successfully');
        setSession(newSession);
        setUser(newSession.user);
        return { success: true };
      }
      
      console.warn('[Auth] No session returned from refresh');
      return { success: false, error: 'No session returned' };
    } catch (error: any) {
      console.error('[Auth] Session refresh failed:', error);
      return { success: false, error: error.message };
    }
  };

  const value: AuthContextType = {
    user,
    session,
    loading,
    profileLoading,
    signIn,
    signUp,
    signOut,
    profile,
    updateProfile: updateProfileData,
    resendVerificationEmail,
    refreshProfile,
    verifySession,
    refreshSession,
    // Stubs - use useRoles() hook instead
    roles: [] as AppRole[],
    highestRole: null,
    isAdmin: false,
    isReviewer: false,
    isCompany: false,
    activeRole: null,
    availableRoles: [],
    requiresRoleSelection: false,
    setActiveRole: () => {},
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
