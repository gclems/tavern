import { useEffect, useRef } from 'react';

import { router } from '@inertiajs/react';

export function useRefreshOnTabFocus(staleAfterMinutes = 5) {
    const lastHiddenAt = useRef<number>(0);
    const STALE_AFTER_MS = staleAfterMinutes * 60 * 1000;

    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.hidden) {
                lastHiddenAt.current = Date.now();
            } else {
                const now = Date.now();
                if (lastHiddenAt.current && now - lastHiddenAt.current > STALE_AFTER_MS) {
                    router.reload();
                }
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
    }, [STALE_AFTER_MS]);
}
