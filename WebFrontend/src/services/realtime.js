import { getSupabase } from './supabaseClient';

// PUBLIC_INTERFACE
export function subscribeToChannel(channelName, callback) {
  /** Subscribe to a Supabase realtime channel; no-op if client missing */
  const sb = getSupabase();
  if (!sb) {
    // return a dummy unsub function
    return () => {};
  }
  const channel = sb.channel(channelName);
  const sub = channel.on('broadcast', { event: 'message' }, payload => {
    callback?.(payload);
  }).subscribe();
  return () => {
    try {
      sb.removeChannel(channel);
    } catch {
      // ignore
    }
  };
}
