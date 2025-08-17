import { useMemo } from 'react';

export function useCookie(name: string) {
    return useMemo(() => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) {
            const part = parts.pop();
            return part ? part.split(';').shift() : null;
        }
        return null;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [name, document.cookie]);
}
