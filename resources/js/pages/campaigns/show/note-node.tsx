import { CircleIcon, MinusIcon, PlusIcon } from 'lucide-react';
import { NodeRendererProps } from 'react-arborist';
import { Button, cn } from 'shanty-ui';

import { Note } from '@/types/models/note';
import { NoteTreeItem } from '@/types/note-tree-item';

import { useCampaign } from './campaign-provider';
import { CreateNoteButton } from './create-note-button';

function NoteNode({ style, node, dragHandle }: NodeRendererProps<NoteTreeItem>) {
    const { campaign, selectedNote } = useCampaign();

    const treeItem: NoteTreeItem = node.data;
    const note: Note = treeItem.data;

    return (
        <div style={style}>
            <div
                className={cn('flex items-center gap-x-2 border-2 border-l-4 border-transparent', {
                    'bg-dnd-background border-dnd-primary': selectedNote === note,
                })}
            >
                <Button
                    disabled={!treeItem.children?.length}
                    className={cn({
                        'opacity-20': !treeItem.children?.length,
                    })}
                    onClick={(e) => {
                        e.stopPropagation();
                        node.toggle();
                    }}
                    variant="link"
                >
                    {!treeItem.children?.length ? <CircleIcon /> : node.isOpen ? <MinusIcon size={10} /> : <PlusIcon size={10} />}
                </Button>
                <div ref={dragHandle} className="w-full overflow-hidden text-ellipsis whitespace-nowrap">
                    {treeItem.name}
                </div>
                <CreateNoteButton campaignId={campaign.id} noteCategoryId={note.note_category_id} noteId={note.id} />
            </div>
        </div>
    );
}

export { NoteNode };
