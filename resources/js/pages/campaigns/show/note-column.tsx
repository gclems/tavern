import { hotkeysCoreFeature, syncDataLoaderFeature } from '@headless-tree/core';
import { useTree } from '@headless-tree/react';
import { cn, ScrollArea } from 'shanty-ui';

import { NoteCategoryTreeItem } from '@/types/note-category-tree-item';
import { NoteTreeItem } from '@/types/note-tree-item';

import { useCampaign } from './campaign-provider';
import { CreateNoteButton } from './create-note-button';
import { NoteNode } from './note-node';

function NoteColumn({ categoryTreeItem }: { categoryTreeItem: NoteCategoryTreeItem }) {
    const {
        campaign,
        treeColumns,
        treeItems,
        selectedNote,
        handleSelectNote,
        // handleNoteTreeItemMove
    } = useCampaign();

    const category = categoryTreeItem.data;

    const tree = useTree<NoteCategoryTreeItem | NoteTreeItem>({
        rootItemId: categoryTreeItem.id,
        getItemName: (item) => item.getItemData().name,
        isItemFolder: (item) => item.getItemData().children?.length > 0,
        dataLoader: {
            getItem: (itemId) => treeItems[itemId],
            getChildren: (itemId) => treeItems[itemId].children,
        },
        indent: 20,
        features: [syncDataLoaderFeature, hotkeysCoreFeature],
    });

    return (
        <div
            className={cn('flex h-full min-w-[150px] flex-col', {
                'border-l': category.sort_order > 0,
            })}
            style={{ width: `${50 / treeColumns.length}%`, flexGrow: 1 }}
        >
            <div className="flex items-center justify-between border-b px-1">
                {category.name}
                <CreateNoteButton campaignId={campaign.id} noteCategoryId={category.id} />
            </div>

            <ScrollArea.Root className="max-h-full min-h-full">
                <ScrollArea.Viewport className="max-h-full min-h-full overscroll-contain">
                    <div {...tree.getContainerProps()} className="flex flex-col">
                        {tree.getItems().map((item) => (
                            <div
                                key={item.getId()}
                                {...item.getProps()}
                                onClick={() => {}}
                                className="flex"
                                // style={{ paddingLeft: `${item.getItemMeta().level * 12}px` }}
                            >
                                <NoteNode item={item} />
                            </div>
                        ))}
                    </div>
                </ScrollArea.Viewport>
                <ScrollArea.Scrollbar className="bg-scrollbar-background flex w-1 justify-center rounded opacity-0 transition-opacity delay-300 data-[hovering]:opacity-100 data-[hovering]:delay-0 data-[hovering]:duration-75 data-[scrolling]:opacity-100 data-[scrolling]:delay-0 data-[scrolling]:duration-75">
                    <ScrollArea.Thumb className="bg-scrollbar-thumb w-full rounded" />
                </ScrollArea.Scrollbar>
            </ScrollArea.Root>
        </div>
    );
}

export { NoteColumn };
