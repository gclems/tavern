import React from 'react';

import { Head } from '@inertiajs/react';
import { setDefaultOptions } from 'date-fns';
import { fr } from 'date-fns/locale';
import { cn, Providers } from 'shanty-ui';

import { useCookie } from '@/hooks/use-cookie';
import useFlashToast from '@/hooks/use-flash-toast';
import { useRefreshOnTabFocus } from '@/hooks/use-refresh-on-focus';

interface Props extends React.PropsWithChildren {
    title?: string;
    className?: string;
}

const InnerBaseLayout: React.FC<Props> = ({ title = '', children, className }) => {
    useFlashToast();

    return (
        <>
            <Head title={title} />
            <div className={cn('flex w-full', className)}>{children}</div>
        </>
    );
};

const BaseLayout = (props: Props) => {
    const sidebarState = useCookie('sidebar_state');

    useRefreshOnTabFocus(10); // Refresh the page if the tab is inactive for 10 minutes
    setDefaultOptions({ locale: fr });

    return (
        <Providers sidebar={{ defaultOpen: sidebarState === 'true' }}>
            <InnerBaseLayout {...props} />
        </Providers>
    );
};

export default BaseLayout;
