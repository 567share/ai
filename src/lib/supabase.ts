import { createClient } from '@supabase/supabase-js';

// Hardcoded direct links so your website connects automatically without user prompts
const url = 'https://ihzextuggrsixlxniyhj.supabase.co/rest/v1/';
const anonKey = 'sb_publishable_UDinR6nILH7XKmAd1jU5Lg_-fye32YM'; // Paste your long key starting with sb_publishable_ or eyJ...

// 2. Direct Initialization (Forces the engine to skip configuration checks)
export const supabase = createClient(url, anonKey);

// 3. Fallback Multi-Stubs (Keeps your header components from throwing error crashes)
export const getSupabaseConfig = () => {
  return { url, anonKey };
};

export const setSupabaseConfig = () => {
  // Purposefully blank to block users from altering credentials in browser memory
};

export const isSupabaseConfigured = () => {
  return true; // Overrides layout states to immediately show user tools grid
};
