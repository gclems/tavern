import { ItemInstance } from '@headless-tree/core';
import { SquareMinusIcon, SquarePlusIcon } from 'lucide-react';
import { Button, cn } from 'shanty-ui';

import { Note } from '@/types/models/note';
import { NoteCategoryTreeItem } from '@/types/note-category-tree-item';
import { NoteTreeItem } from '@/types/note-tree-item';

import { useCampaign } from './campaign-provider';
import { CreateNoteButton } from './create-note-button';

function NoteNode({ item }: { item: ItemInstance<NoteCategoryTreeItem | NoteTreeItem> }) {
    const { campaign, selectedNote, handleSelectNote } = useCampaign();

    const note: Note = item.getItemData().data as Note;

    return (
        <div className="flex min-w-full justify-start">
            {Array.from({ length: item.getItemMeta().level }).map((_, i) => (
                <div key={i} className="border-dnd-primary/20 w-3 border-r" />
            ))}
            <div
                className={cn('flex w-full items-center gap-x-2 border-2 border-l-4 border-transparent', {
                    'bg-dnd-background border-dnd-primary': selectedNote === note,
                })}
            >
                <Button
                    disabled={!item.isFolder()}
                    onClick={(e) => {
                        e.stopPropagation();
                        if (item.isExpanded()) {
                            item.collapse();
                        } else {
                            item.expand();
                        }
                    }}
                    variant="link"
                    className={cn({
                        'opacity-0': !item.isFolder(),
                    })}
                >
                    {item.isExpanded() ? <SquareMinusIcon size={10} /> : <SquarePlusIcon size={10} />}
                </Button>
                <button
                    type="button"
                    className="w-full cursor-pointer overflow-hidden text-left text-ellipsis whitespace-nowrap"
                    onClick={() => {
                        handleSelectNote(note);
                        // auto expand if it's a collapsed folder
                        if (item.isFolder() && !item.isExpanded()) {
                            item.expand();
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
