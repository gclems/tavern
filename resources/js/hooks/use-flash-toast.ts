import { useEffect } from 'react';

import { usePage } from '@inertiajs/react';
import { useToastManager } from 'shanty-ui';

import FlashMessages from '@/lang/flash';
import { Flash } from '@/types/flash';

export default function useFlashToast() {
    const { message } = usePage().props.flash as Flash;
    const toast = useToastManager();

    useEffect(() => {
        if (message) {
            const text = FlashMessages[message.code]?.(message.params);
            if (text) {
                toast.add({ description: text });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [message]);
}
