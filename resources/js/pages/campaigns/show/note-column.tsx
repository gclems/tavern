import { useEffect, useId, useMemo, useState } from 'react';

import { dragAndDropFeature, DragTarget, hotkeysCoreFeature, selectionFeature, syncDataLoaderFeature } from '@headless-tree/core';
import { useTree } from '@headless-tree/react';
import { cn, ScrollArea } from 'shanty-ui';

import { HeadlessTreeItem } from '@/types/headless-tree-item';
import { NoteCategoryTreeItem } from '@/types/note-category-tree-item';
import { NoteTreeItem } from '@/types/note-tree-item';

import { useCampaign } from './campaign-provider';
import { CreateNoteButton } from './create-note-button';
import { NoteNode } from './note-node';

function NoteColumn({ categoryTreeItem }: { categoryTreeItem: NoteCategoryTreeItem }) {
    const [expandedItems, setExpandedItems] = useState<HeadlessTreeItem[]>([]);

    const { campaign, treeColumns, treeItems, selectedNote, getTreeItemByNoteId, handleNoteTreeItemMove } = useCampaign();

    const dragPreviewId = useId();

    const category = categoryTreeItem.data;

    const selectedNoteItemId = useMemo<string | undefined>(() => {
        let id = (selectedNote ? getTreeItemByNoteId(selectedNote.id) : null)?.id;
        if (id && !categoryTreeItem.children.some((childId) => childId === id)) {
            id = undefined; // reset if the selected note is not in this category
        }

        return id;
    }, [selectedNote, getTreeItemByNoteId, categoryTreeItem.children]);

    const tree = useTree<HeadlessTreeItem>({
        rootItemId: categoryTreeItem.id,
        state: { selectedItems: selectedNoteItemId ? [selectedNoteItemId] : [], expandedItems, focusedItem: selectedNoteItemId },
        setExpandedItems,
        getItemName: (item) => item.getItemData().name,
        isItemFolder: () => true,
        dataLoader: {
            getItem: (itemId) => treeItems[itemId],
            getChildren: (itemId) => treeItems[itemId].children,
        },
        indent: 20,
        setDragImage: () => ({
            imgElement: document.getElementById(dragPreviewId)!,
            xOffset: -20,
        }),
        onDrop: (items, target: DragTarget<HeadlessTreeItem>) => {
            const movedItem = items[0]?.getItemData() as NoteTreeItem;
            const targetItem = target?.item.getItemData() as HeadlessTreeItem;

            handleNoteTreeItemMove(movedItem, targetItem, target.childIndex);

            if (!expandedItems.includes(targetItem.id)) {
                setExpandedItems((prev) => [...prev, targetItem.id]);
            }
        },
        createForeignDragObject: (items) => ({
            format: 'text/plain',
            data: items[0].getId(),
        }),
        onCompleteForeignDrop: () => {},
        canDropForeignDragObject: () => true,
        onDropForeignDragObject: (dataTransfer, target) => {
            const droppedId = dataTransfer.getData('text/plain');
            const movedItem = treeItems[droppedId];
            const targetItem = target?.item.getItemData() as HeadlessTreeItem;
            handleNoteTreeItemMove(movedItem, targetItem, target.childIndex);
            if (!expandedItems.includes(targetItem.id)) {
                setExpandedItems((prev) => [...prev, targetItem.id]);
            }
        },
        features: [syncDataLoaderFeature, selectionFeature, hotkeysCoreFeature, dragAndDropFeature],
    });

    // Rebuild tree when a change happens in the items list
    // (e.g. after drag n drop or adding an item)
    useEffect(() => {
        tree.rebuildTree();
    }, [treeItems, tree]);

    const draggedItems = tree.getState().dnd?.draggedItems;

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
                            <div key={item.getId()} {...item.getProps()} onClick={() => {}} className="flex">
                                <NoteNode item={item} />
                            </div>
                        ))}
                        <div style={tree.getDragLineStyle()} className="bg-dnd-primary h-1" />
                    </div>
                </ScrollArea.Viewport>
                <ScrollArea.Scrollbar className="bg-scrollbar-background flex w-1 justify-center rounded opacity-0 transition-opacity delay-300 data-[hovering]:opacity-100 data-[hovering]:delay-0 data-[hovering]:duration-75 data-[scrolling]:opacity-100 data-[scrolling]:delay-0 data-[scrolling]:duration-75">
                    <ScrollArea.Thumb className="bg-scrollbar-thumb w-full rounded" />
                </ScrollArea.Scrollbar>
            </ScrollArea.Root>
            <div
                id={dragPreviewId}
                className="bg-dnd-background text-dnd-foreground border-dnd-primary absolute -left-full w-auto border-2 p-1 shadow-md"
            >
                {draggedItems
                    ?.slice(0, 3)
                    .map((item) => item.getItemName())
                    .join(', ')}
            </div>
        </div>
    );
}

export { NoteColumn };
