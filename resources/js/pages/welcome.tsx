import PrivateLayout from '@/layouts/private';

export default function Welcome() {
    return (
        <PrivateLayout title="Tavern - Crafted tale" description="Welcome to Tavern">
            <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"></div>
            <div className="grid md:grid-cols-2">parametrages</div>
        </PrivateLayout>
    );
}
