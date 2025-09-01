import { useEffect, useId, useState } from 'react';

import {
    dragAndDropFeature,
    DragTarget,
    hotkeysCoreFeature,
    ItemInstance,
    removeItemsFromParents,
    selectionFeature,
    syncDataLoaderFeature,
} from '@headless-tree/core';
import { useTree } from '@headless-tree/react';
import { Button, cn, ScrollArea, SimpleDialog } from 'shanty-ui';

import { HeadlessTreeItem } from '@/types/headless-tree-item';
import { NoteCategoryTreeItem } from '@/types/note-category-tree-item';
import { NoteTreeItem } from '@/types/note-tree-item';

import { useCampaign } from './campaign-provider';
import { CreateNoteButton } from './create-note-button';
import { NoteNode } from './note-node';

function NoteColumn({ categoryTreeItem }: { categoryTreeItem: NoteCategoryTreeItem }) {
    const [expandedItems, setExpandedItems] = useState<HeadlessTreeItem[]>([]);

    const { campaign, treeColumns, treeItems, selectedTreeItemId, moveNoteTreeItem, deleteNote } = useCampaign();

    const [noteTreeItemToDelete, setNoteTreeItemToDelete] = useState<ItemInstance<NoteTreeItem> | null>(null);

    const dragPreviewId = useId();

    const category = categoryTreeItem.data;

    const tree = useTree<HeadlessTreeItem>({
        rootItemId: categoryTreeItem.id,
        state: { selectedItems: selectedTreeItemId ? [selectedTreeItemId] : [], focusedItem: selectedTreeItemId, expandedItems },
        setExpandedItems,
        getItemName: (item) => {
            return item?.getItemData()?.name ?? 'deleted';
        },
        isItemFolder: () => true,
        dataLoader: {
            getItem: (itemId) => {
                return treeItems[itemId] ?? { name: 'deleted' };
            },
            getChildren: (itemId) => {
                return treeItems[itemId]?.children ?? [];
            },
        },
        indent: 20,
        setDragImage: () => ({
            imgElement: document.getElementById(dragPreviewId)!,
            xOffset: -20,
        }),
        onDrop: (items, target: DragTarget<HeadlessTreeItem>) => {
            const movedItem = items[0]?.getItemData() as NoteTreeItem;
            const targetItem = target?.item.getItemData() as HeadlessTreeItem;

            moveNoteTreeItem(movedItem, targetItem, target.childIndex);

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
            moveNoteTreeItem(movedItem, targetItem, target.childIndex);
            if (!expandedItems.includes(targetItem.id)) {
                setExpandedItems((prev) => [...prev, targetItem.id]);
            }
        },
        features: [syncDataLoaderFeature, selectionFeature, hotkeysCoreFeature, dragAndDropFeature],
    });

    // Rebuild tree when a change happens in the items list
    // (e.g. after drag n drop, adding or removing an item)
    useEffect(() => {
        tree.rebuildTree();
    }, [treeItems, tree]);

    const handleDeleteNote = () => {
        if (!noteTreeItemToDelete) return;

        removeItemsFromParents([noteTreeItemToDelete], () => {
            deleteNote(noteTreeItemToDelete.getItemData().data);
        });
        setNoteTreeItemToDelete(null);
    };

    const draggedItems = tree.getState().dnd?.draggedItems;

    return (
        <>
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
                                    <NoteNode item={item} onDelete={() => setNoteTreeItemToDelete(item)} />
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
            <SimpleDialog.Root
                open={!!noteTreeItemToDelete}
                onOpenChangeComplete={(open: boolean) => {
                    if (!open) setNoteTreeItemToDelete(null);
                }}
            >
                <SimpleDialog.Popup>
                    <SimpleDialog.Header title="Supprimer une note" />
                    <div className="text-center">
                        <p>
                            Êtes-vous sûr de vouloir supprimer la note
                            <br />
                            <span className="text-2xl">
                                <strong>
                                    <i>{noteTreeItemToDelete?.getItemData()?.data?.name}</i>
                                </strong>
                            </span>
                            <br />
                            et toutes les notes qu'elle contient ?
                        </p>
                        <p className="mt-4">
                            <strong>Cette action est irréversible.</strong>
                        </p>
                    </div>
                    <SimpleDialog.Footer>
                        <Button
                            variant="ghost"
                            onClick={() => {
                                setNoteTreeItemToDelete(null);
                            }}
                        >
                            Annuler
                        </Button>
                        <Button variant="destructive" onClick={handleDeleteNote}>
                            Supprimer
                        </Button>
                    </SimpleDialog.Footer>
                </SimpleDialog.Popup>
            </SimpleDialog.Root>
        </>
    );
}

export { NoteColumn };
