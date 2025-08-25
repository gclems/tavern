import { ItemInstance } from '@headless-tree/core';
import { SquareMinusIcon, SquarePlusIcon } from 'lucide-react';
import { Button, cn } from 'shanty-ui';

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
                className={cn('hover:bg-dnd-primary/10 flex w-full items-center gap-x-1 overflow-auto border-2 border-l-4 border-transparent', {
                    'bg-dnd-background border-dnd-primary text-dnd-primary': selectedNote === note,
                    'bg-dnd-primary/20': item.isDragTarget(),
                })}
            >
                <Button
                    disabled={!hasChildren}
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
                        'opacity-0': !hasChildren,
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
                        if (hasChildren && !item.isExpanded()) {
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
