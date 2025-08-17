import { Card } from 'shanty-ui';

import BaseLayout from './base';

interface PublicLayoutProps {
    title?: string;
    description?: string;
}

const PublicLayout: React.FC<React.PropsWithChildren<PublicLayoutProps>> = ({ children, title, description }) => {
    return (
        <BaseLayout title={title} className="flex h-screen w-full flex-col items-center justify-center">
            <Card.Root className="w-full max-w-lg">
                <Card.Header>
                    <Card.Title>{title}</Card.Title>
                    <Card.Description>{description}</Card.Description>
                </Card.Header>
                <Card.Content>{children}</Card.Content>
            </Card.Root>
        </BaseLayout>
    );
};

export default PublicLayout;
