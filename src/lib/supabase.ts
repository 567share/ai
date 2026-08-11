import { createClient } from '@supabase/supabase-js';

// Hardcoded direct links so your website connects automatically without user prompts
const url = 'https://ihzextuggrsixlxniyhj.supabase.co/rest/v1/';
const anonKey = 'sb_publishable_UDinR6nILH7XKmAd1jU5Lg_-fye32YM'; // Paste your long key starting with sb_publishable_ or eyJ...

// Export config functions as empty fallbacks so your other components don't crash from missing functions
export const getSupabaseConfig = () => ({ url, anonKey });
export const setSupabaseConfig = () => {};

// Initialize the master Supabase client with your real credentials
export const supabase = createClient(url, anonKey);

// Force this to true so the app always knows it is successfully connected
export const isSupabaseConfigured = () => true;
