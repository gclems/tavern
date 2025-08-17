import { useMemo } from 'react';

// import { NodeApi, Tree } from 'react-arborist';
import { cn } from 'shanty-ui';

import { Campaign } from '@/types/models/campaign';
import { Note } from '@/types/models/note';
import { NoteCategory } from '@/types/models/noteCategory';
import { NoteCategoryTreeItem } from '@/types/note-category-tree-item';
import { NoteTreeItem } from '@/types/note-tree-item';

import { CreateNoteButton } from './create-note-button';
// import { NoteNode } from './note-node';

function NoteArborist({
    campaign,
    noteCategories,
    notes,
    onSelectNote,
}: {
    campaign: Campaign;
    noteCategories: NoteCategory[];
    notes: Note[];
    selectedNote: Note | null;
    onSelectNote: (note: Note | null) => void;
}) {
    const data: NoteCategoryTreeItem[] = useMemo(() => {
        // create columns & and a map of noteCategory.id → NoteCategoryTreeItem
        const columns: NoteCategoryTreeItem[] = [];
        const columnsById: Record<number, NoteCategoryTreeItem> = {};

        // create NoteCategoryTreeItem and put them in columns
        noteCategories
            .sort((a, b) => a.sort_order - b.sort_order)
            .forEach((category) => {
                const treeItem = {
                    id: `${category.id}`,
                    name: category.name,
                    children: [],
                    data: category,
                };
                columns.push(treeItem);
                columnsById[category.id] = treeItem;
            });

        // create a map of note.id → NoteTreeItem
        const noteMap: Record<number, NoteTreeItem> = {};
        notes
            .sort((a, b) => a.sort_order - b.sort_order)
            .forEach((note) => {
                noteMap[note.id] = {
                    id: `${note.id}`,
                    name: note.name,
                    children: [],
                    data: note,
                };
            });

        // attach notes to parents (or to category root if no parent)
        for (const note of notes) {
            const treeNote = noteMap[note.id];
            if (note.note_id) {
                noteMap[note.note_id]?.children.push(treeNote);
            } else {
                columnsById[note.note_category_id].children.push(treeNote);
            }
        }

        return columns;
    }, [noteCategories, notes]);

    return (
        <>
            {data.map((column, index) => (
                <div
                    key={index}
                    className={cn('flex h-full flex-col', {
                        'border-l': index > 0,
                    })}
                    style={{ width: `${50 / data.length}%`, flexGrow: 1 }}
                >
                    <div className="flex items-center justify-between border-b px-1">
                        {column.name}
                        <CreateNoteButton campaignId={campaign.id} noteCategoryId={column.data.id} />
                    </div>
                    <div className="min-w-[150px]">
                        {/* <Tree
                            openByDefault={false}
                            initialData={column.children}
                            onSelect={(node: NodeApi<NoteTreeItem>[]) => {
                                const selected = node[0]?.data;
                                onSelectNote?.(selected?.data ?? null);
                            }}
                        >
                            {NoteNode}
                        </Tree> */}
                    </div>
                </div>
            ))}
        </>
    );
}

export { NoteArborist };
