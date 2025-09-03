import { ArrowLeftIcon, ArrowRightIcon, TrashIcon } from 'lucide-react';
import { Button, SimpleMenu } from 'shanty-ui';

import { NoteCategory } from '@/types/models/noteCategory';

import { useCampaign } from './campaign-provider';
import { CreateNoteButton } from './create-note-button';

function NoteColumnTitle({ category }: { category: NoteCategory }) {
    const { campaign, treeColumns, moveCategory } = useCampaign();

    return (
        <div className="flex items-center justify-between px-1">
            <div className="flex-1 overflow-hidden text-left text-sm text-ellipsis whitespace-nowrap">{category.name}</div>
            <SimpleMenu.Root>
                <SimpleMenu.Trigger render={<Button variant="link">...</Button>} />
                <SimpleMenu.Popup>
                    <div className="mb-1 text-center">{category.name}</div>
                    <div className="flex items-center gap-x-1">
                        <SimpleMenu.Item
                            onClick={() => {
                                moveCategory(category, category.sort_order - 1);
                            }}
                            disabled={category.sort_order === 0}
                        >
                            <ArrowLeftIcon />
                        </SimpleMenu.Item>
                        <SimpleMenu.Item render={<CreateNoteButton campaignId={campaign.id} noteCategoryId={category.id} />} />
                        <SimpleMenu.Item
                            onClick={() => {
                                moveCategory(category, category.sort_order + 1);
                            }}
                            disabled={category.sort_order >= treeColumns.length - 1}
                        >
                            <ArrowRightIcon />
                        </SimpleMenu.Item>
                    </div>

                    <SimpleMenu.Item>
                        <TrashIcon />
                    </SimpleMenu.Item>
                </SimpleMenu.Popup>
            </SimpleMenu.Root>
        </div>
    );
}

export { NoteColumnTitle };
