import { createClient } from '@supabase/supabase-js';

// Direct Master Links with environment variable overrides
const env = (import.meta as unknown as { env: Record<string, string> }).env || {};
const url = env.VITE_SUPABASE_URL || 'https://ihzextuggrsixlxniyhj.supabase.co';
const anonKey = env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_UDinR6nILH7XKmAd1jU5Lg_-fye32YM'; 

export const supabase = createClient(url, anonKey);

// Fallback Multi-Stubs
export const getSupabaseConfig = () => {
  return { url, anonKey };
};

export const setSupabaseConfig = () => {
  // Purposefully blank to block altering credentials in browser memory
};

export const isSupabaseConfigured = () => {
  return true;
};
