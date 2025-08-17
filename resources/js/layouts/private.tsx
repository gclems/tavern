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
            <main className="w-full">
                <Titlebar title={title} />
                {description && <div className="text-muted-foreground my-4 px-4">{description}</div>}
                <div className="flex-1 overflow-y-auto pb-8">{children}</div>
            </main>
        </BaseLayout>
    );
};

export default PrivateLayout;
