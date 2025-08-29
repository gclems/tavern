import { ItemInstance } from '@headless-tree/core';
import { SquareMinusIcon, SquarePlusIcon } from 'lucide-react';
import { cn } from 'shanty-ui';

import { HeadlessTreeItem } from '@/types/headless-tree-item';
import { Note } from '@/types/models/note';

import { useCampaign } from './campaign-provider';
import { CreateNoteButton } from './create-note-button';

function NoteNode({ item }: { item: ItemInstance<HeadlessTreeItem> }) {
    const { campaign, selectedNote, handleSelectNote } = useCampaign();

    const note: Note = item.getItemData().data as Note;

    const hasChildren = item.getItemData().children?.length > 0;

    return (
        <div className="flex min-w-full justify-start text-xs">
            {Array.from({ length: item.getItemMeta().level }).map((_, i) => (
                <div key={i} className="border-border w-3 shrink-0 grow-0 border-r border-dotted" />
            ))}
            <div
                className={cn('hover:bg-dnd-primary/10 flex w-full items-center gap-x-1 overflow-hidden border-2 border-l-4 border-transparent', {
                    'bg-dnd-background border-dnd-primary text-dnd-primary': selectedNote === note,
                    'bg-dnd-primary/20': item.isDragTarget(),
                })}
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
                        handleSelectNote(note);

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
        </div>
    );
}

export { NoteNode };
