import Titlebar from '@/components/titlebar';

import BaseLayout from './base';

interface PrivateLayoutProps {
    title?: string;
    description?: React.ReactNode;
    menuKey?: string;
}

const PrivateLayout: React.FC<React.PropsWithChildren<PrivateLayoutProps>> = ({ children, title, description }) => {
    return (
        <BaseLayout title={title}>
            <main className="flex h-screen w-full flex-col">
                <Titlebar title={title} />
                {description && <div className="text-muted-foreground my-4 px-4">{description}</div>}
                <div className="flex grow flex-col overflow-y-auto">{children}</div>
            </main>
        </BaseLayout>
    );
};

export default PrivateLayout;
