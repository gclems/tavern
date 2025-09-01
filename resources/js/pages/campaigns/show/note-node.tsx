import { ItemInstance } from '@headless-tree/core';
import { SquareMinusIcon, SquarePlusIcon, TrashIcon } from 'lucide-react';
import { cn, SimpleContextMenu } from 'shanty-ui';

import { HeadlessTreeItem } from '@/types/headless-tree-item';
import { Note } from '@/types/models/note';
import { NoteTreeItem } from '@/types/note-tree-item';

import { useCampaign } from './campaign-provider';
import { CreateNoteButton } from './create-note-button';

function NoteNode({ item, onDelete }: { item: ItemInstance<HeadlessTreeItem>; onDelete: () => void }) {
    const { campaign, selectedTreeItemId, selectedNote, selectTreeItem, unSelectTreeItem } = useCampaign();

    const treeItem = item.getItemData() as NoteTreeItem;
    const note: Note = treeItem.data;

    const hasChildren = item.getItemData().children?.length > 0;

    if (!note) return null;

    return (
        <div className="flex min-w-full justify-start text-xs">
            {Array.from({ length: item.getItemMeta().level }).map((_, i) => (
                <div key={i} className="border-border w-3 shrink-0 grow-0 border-r border-dotted" />
            ))}
            <SimpleContextMenu.Root>
                <SimpleContextMenu.Trigger
                    render={
                        <div
                            className={cn(
                                'hover:bg-dnd-primary/10 flex w-full items-center gap-x-1 overflow-hidden border-2 border-l-4 border-transparent',
                                {
                                    'bg-dnd-background border-dnd-primary text-dnd-primary': selectedNote === note,
                                    'bg-dnd-primary/20': item.isDragTarget(),
                                },
                            )}
                        >
                            <button
                                type="button"
                                disabled={!hasChildren}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (item.isExpanded()) {
                                        item.collapse();
                                    } else {
                                        item.expand();
                                    }
                                }}
                                className={cn({
                                    'opacity-0': !hasChildren,
                                })}
                            >
                                {/* <ChevronRightSquare className={cn('transition-all duration-100', { 'rotate-90': item.isExpanded() })} size="1rem" /> */}
                                {item.isExpanded() ? <SquareMinusIcon size="1rem" /> : <SquarePlusIcon size="1rem" />}
                                {/* {item.isExpanded() ? <FolderOpenIcon size="1rem" /> : <FolderIcon size="1rem" />} */}
                            </button>
                            <button
                                type="button"
                                className="w-full cursor-pointer overflow-hidden text-left text-ellipsis whitespace-nowrap"
                                onClick={() => {
                                    if (selectedTreeItemId === treeItem.id) {
                                        unSelectTreeItem();
                                    } else {
                                        selectTreeItem(treeItem);
                                    }

                                    if (hasChildren) {
                                        if (note !== selectedNote) {
                                            // expand if selecting note
                                            item.expand();
                                        } else if (selectedNote === note) {
                                            // expand if unselecting note
                                            item.collapse();
                                        }
                                    }
                                }}
                            >
                                {note.name}
                            </button>
                            <CreateNoteButton campaignId={campaign.id} noteCategoryId={note.note_category_id} noteId={note.id} />
                        </div>
                    }
                />
                <SimpleContextMenu.Popup>
                    <SimpleContextMenu.Item onClick={() => onDelete?.()}>
                        <TrashIcon /> Delete
                    </SimpleContextMenu.Item>
                </SimpleContextMenu.Popup>
            </SimpleContextMenu.Root>
        </div>
    );
}

export { NoteNode };
