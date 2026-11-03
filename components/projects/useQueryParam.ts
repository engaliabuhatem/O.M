'use client';

import { useCallback, useSyncExternalStore } from 'react';

const EVENT = 'fcom:querychange';

function subscribe(cb: () => void) {
  window.addEventListener('popstate', cb);
  window.addEventListener(EVENT, cb);
  return () => {
    window.removeEventListener('popstate', cb);
    window.removeEventListener(EVENT, cb);
  };
}

/**
 * Reads/writes one query-string param without a router round-trip (static export friendly).
 * Server snapshot is `null`, so pre-rendered HTML shows the default state.
 */
export function useQueryParam(name: string): [string | null, (value: string | null) => void] {
  const value = useSyncExternalStore(
    subscribe,
    () => new URLSearchParams(window.location.search).get(name),
    () => null,
  );

  const set = useCallback(
    (next: string | null) => {
      const url = new URL(window.location.href);
      if (next === null) url.searchParams.delete(name);
      else url.searchParams.set(name, next);
      window.history.replaceState(window.history.state, '', url);
      window.dispatchEvent(new Event(EVENT));
    },
    [name],
  );

  return [value, set];
}
