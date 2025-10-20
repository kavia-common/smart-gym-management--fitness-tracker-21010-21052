import { createClient } from '@supabase/supabase-js';

const url = process.env.REACT_APP_SUPABASE_URL;
const key = process.env.REACT_APP_SUPABASE_ANON_KEY;

let supabase = null;
if (url && key) {
  supabase = createClient(url, key);
}

// PUBLIC_INTERFACE
export function getSupabase() {
  /** Returns Supabase client if configured, else null */
  return supabase;
}
