import { createClient } from '@supabase/supabase-js';

// Read from Vite environment variables or localStorage overrides
export const getSupabaseConfig = () => {
  const env = (import.meta as any).env || {};
  const url = env.VITE_SUPABASE_URL || localStorage.getItem('supabase_url') || '';
  const anonKey = env.VITE_SUPABASE_ANON_KEY || localStorage.getItem('supabase_anon_key') || '';
  return { url, anonKey };
};

export const setSupabaseConfig = (url: string, anonKey: string) => {
  localStorage.setItem('supabase_url', url);
  localStorage.setItem('supabase_anon_key', anonKey);
};

const config = getSupabaseConfig();

// Initialize Supabase client if credentials exist, otherwise dummy or customizable client
export const supabase = createClient(
  config.url || 'https://placeholder-project.supabase.co',
  config.anonKey || 'placeholder-anon-key'
);

export const isSupabaseConfigured = () => {
  const { url, anonKey } = getSupabaseConfig();
  return Boolean(url && anonKey && !url.includes('placeholder-project'));
};
