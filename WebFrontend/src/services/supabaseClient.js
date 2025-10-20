import { createClient } from '@supabase/supabase-js';

/**
 * Shared Supabase client initializer for WebFrontend.
 * Safe no-op when env vars are missing.
 */
const url = process.env.REACT_APP_SUPABASE_URL;
const key = process.env.REACT_APP_SUPABASE_ANON_KEY;
let supabase = null;

try {
  if (url && key) {
    supabase = createClient(url, key);
  }
} catch {
  // swallow initialization errors to avoid crashing
}

/**
 * PUBLIC_INTERFACE
 */
// PUBLIC_INTERFACE
export function getSupabase() {
  /** Returns Supabase client if configured, else null */
  return supabase;
}

// PUBLIC_INTERFACE
export function isSupabaseEnabled() {
  /** Indicates whether Supabase is configured (both URL and ANON KEY present) */
  return Boolean(supabase);
}
