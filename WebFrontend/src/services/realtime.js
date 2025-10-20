import { getSupabase } from './supabaseClient';

const FEATURE_REALTIME =
  String(process.env.REACT_APP_FEATURE_REALTIME || 'false').toLowerCase() === 'true';

// PUBLIC_INTERFACE
export function subscribeToChannel(channelName, callback) {
  /**
   * Subscribe to a Supabase realtime channel; returns a safe no-op unsubscribe
   * when disabled via feature flag or when client is not configured.
   */
  if (!FEATURE_REALTIME) {
    return () => {};
  }

  const sb = getSupabase();
  if (!sb) {
    // return a dummy unsub function
    return () => {};
  }

  const channel = sb.channel(channelName);
  try {
    channel
      .on('broadcast', { event: 'message' }, (payload) => {
        try {
          callback?.(payload);
        } catch {
          // user callback errors shouldn't break subscription
        }
      })
      .subscribe();
  } catch {
    // If subscribe throws, still provide no-op unsubscribe
    return () => {};
  }

  return () => {
    try {
      sb.removeChannel?.(channel);
    } catch {
      // ignore
    }
  };
}
