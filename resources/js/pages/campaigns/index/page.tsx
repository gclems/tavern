import { Link } from '@inertiajs/react';
import { Table } from 'shanty-ui';

import { formatDate, formatDatetime } from '@/helpers/dateHelper';
import PrivateLayout from '@/layouts/private';
import { Campaign } from '@/types/models/campaign';

import { CreateCampaignButton } from './create-campaign-button';

interface Props {
    campaigns: Campaign[];
}

const CampaignsIndexPage: React.FC<Props> = ({ campaigns }) => {
    return (
        <PrivateLayout title="Campagnes" menuKey="campaigns" description="Gérez vos campagnes.">
            <Table.Root className="table-auto">
                <Table.Header>
                    <Table.Row>
                        <Table.Head>Nom</Table.Head>
                        <Table.Head className="text-right" fit>
                            <CreateCampaignButton />
                        </Table.Head>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {campaigns.length === 0 && (
                        <Table.Row>
                            <Table.Cell colSpan={3} className="text-center">
                                <div className="text-muted-foreground text-sm">Aucune campagne trouvée.</div>
                            </Table.Cell>
                        </Table.Row>
                    )}
                    {campaigns.map((campaign) => (
                        <Table.Row key={campaign.id}>
                            <Table.Cell>
                                <Link href={route('campaigns.show', campaign.id)}>{campaign.name}</Link>
                                {/* <UpdateExpenseCategory campaign={campaign} /> */}
                            </Table.Cell>
                            <Table.Cell className="text-right">
                                <span className="lg:hidden">{formatDate(campaign.updated_at)}</span>
                                <span className="hidden lg:inline">{formatDatetime(campaign.updated_at)}</span>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        </PrivateLayout>
    );
};

export default CampaignsIndexPage;
