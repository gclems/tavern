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
import { Button, cn, SimpleDialog } from 'shanty-ui';

import { HeadlessTreeItem } from '@/types/headless-tree-item';
import { NoteCategoryTreeItem } from '@/types/note-category-tree-item';
import { NoteTreeItem } from '@/types/note-tree-item';

import { useCampaign } from './campaign-provider';
import { CreateNoteButton } from './create-note-button';
import { NoteNode } from './note-node';

function NoteColumnTree({ categoryTreeItem }: { categoryTreeItem: NoteCategoryTreeItem }) {
    const [expandedItems, setExpandedItems] = useState<HeadlessTreeItem[]>([]);

    const { campaign, treeItems, selectedTreeItemId, moveNoteTreeItem, deleteNote } = useCampaign();

    const [noteTreeItemToDelete, setNoteTreeItemToDelete] = useState<ItemInstance<NoteTreeItem> | null>(null);

    const dragPreviewId = useId();

    const category = categoryTreeItem.data;

    const tree = useTree<HeadlessTreeItem>({
        rootItemId: categoryTreeItem.id,
        state: { selectedItems: selectedTreeItemId ? [selectedTreeItemId] : [], focusedItem: selectedTreeItemId, expandedItems },
        setExpandedItems,
        // canReorder: false,
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
            xOffset: 0,
            yOffset: 0,
        }),
        onDrop: (items, target: DragTarget<HeadlessTreeItem>) => {
            const movedItem = items[0]?.getItemData() as NoteTreeItem;
            const targetItem = target?.item.getItemData() as HeadlessTreeItem;

            moveNoteTreeItem(movedItem, targetItem);

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
            moveNoteTreeItem(movedItem, targetItem);
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
            <div {...tree.getContainerProps()} className="flex min-h-20 flex-col">
                {tree.getItems().map((item) => (
                    <div key={item.getId()} {...item.getProps()} onClick={() => {}} className="flex">
                        <NoteNode item={item} onDelete={() => setNoteTreeItemToDelete(item)} />
                    </div>
                ))}
                <div style={tree.getDragLineStyle()} className="bg-dnd-primary h-1" />
            </div>
            <div className="my-1 px-1">
                <CreateNoteButton
                    campaignId={campaign.id}
                    noteCategoryId={category.id}
                    className={cn(
                        'hover:bg-dnd-primary/10 flex justify-center text-center opacity-50 hover:opacity-100',
                        'border-dnd-primary/50 w-full rounded-sm border',
                    )}
                />
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

            <div
                id={dragPreviewId}
                className="bg-dnd-background text-dnd-foreground border-dnd-primary fixed -left-[99999px] w-fit border-2 p-1 text-sm shadow-md"
            >
                {draggedItems?.[0]?.getItemName()}
            </div>
        </>
    );
}

export { NoteColumnTree };
