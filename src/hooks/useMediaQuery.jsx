// src/hooks/useMediaQuery.js
import { useState, useEffect } from 'react';

/**
 * A React hook for listening to a CSS media‑query.
 * @param {string} query — e.g. '(min-width: 768px)'
 * @returns {boolean} whether the query currently matches
 */
export default function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = (e) => setMatches(e.matches);

    // Safari doesn’t support addEventListener on MediaQueryList
    if (mql.addEventListener) {
      mql.addEventListener('change', onChange);
    } else {
      mql.addListener(onChange);
    }

    // cleanup
    return () => {
      if (mql.removeEventListener) {
        mql.removeEventListener('change', onChange);
      } else {
        mql.removeListener(onChange);
      }
    };
  }, [query]);

  return matches;
}
