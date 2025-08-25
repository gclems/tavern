import { useContext, createContext, useMemo, useState, useCallback, useEffect } from 'react';

import { HeadlessTreeItem } from '@/types/headless-tree-item';
import { Campaign } from '@/types/models/campaign';
import { Note } from '@/types/models/note';
import { NoteCategory } from '@/types/models/noteCategory';
import { NoteCategoryTreeItem } from '@/types/note-category-tree-item';
import { NoteTreeItem } from '@/types/note-tree-item';

type CampaignContextType = {
    campaign: Campaign;
    treeColumns: NoteCategoryTreeItem[];
    treeItems: Record<string, HeadlessTreeItem>;
    selectedNote: Note | null;
    getTreeItemByNoteId: (noteId: number) => NoteTreeItem | null;
    findNoteById: (noteId: number) => Note | null;
    handleSelectNote: (note: Note | null) => void;
    handleNoteTreeItemMove: (movedItem: NoteTreeItem, targetTreeItem: HeadlessTreeItem, index: number) => Promise<void> | void;
};

type MoveNoteType = {
    note: Note;
    sort_order: number;
    parentNoteCategory?: NoteCategory;
    parentNote?: Note;
};

const CampaignContext = createContext<CampaignContextType | null>(null);

const getCategoryTreeItemId = (categoryId: number) => `category_${categoryId}`;
const getNoteTreeItemId = (noteId: number) => `note_${noteId}`;

function CampaignProvider({
    campaign,
    noteCategories,
    notes,
    children,
    onNoteMove,
}: {
    campaign: Campaign;
    noteCategories: NoteCategory[];
    notes: Note[];
    onNoteMove?: (args: MoveNoteType) => Promise<boolean> | boolean;

    children: React.ReactNode;
}) {
    const [selectedNote, setSelectedNote] = useState<Note | null>(null);

    const treeColumns: NoteCategoryTreeItem[] = useMemo(() => {
        const columns: NoteCategoryTreeItem[] = [];
        noteCategories
            .sort((a, b) => a.sort_order - b.sort_order)
            .forEach((category) => {
                const treeItemId = getCategoryTreeItemId(category.id);
                const treeItem = {
                    id: treeItemId,
                    name: category.name,
                    children: [],
                    data: category,
                };
                columns.push(treeItem);
            });
        return columns;
    }, [noteCategories]);

    const treeItems: Record<string, HeadlessTreeItem> = useMemo(() => {
        // create columns & and a map of noteCategory.id → NoteCategoryTreeItem
        const allItems: Record<string, HeadlessTreeItem> = {};
        const columnsById: Record<string, NoteCategoryTreeItem> = {};

        // add treeColumns in allItems & create a map id -> item
        treeColumns.forEach((item) => {
            allItems[item.id] = item;
            columnsById[item.id] = item;
        });

        // create a map of note.id → NoteTreeItem
        const noteMap: Record<string, NoteTreeItem> = {};
        notes
            .sort((a, b) => a.sort_order - b.sort_order)
            .forEach((note) => {
                const treeItemId = getNoteTreeItemId(note.id);
                const treeItem: NoteTreeItem = {
                    id: treeItemId,
                    name: note.name,
                    children: [],
                    data: note,
                };

                allItems[treeItemId] = treeItem;
                noteMap[treeItemId] = treeItem;
            });

        // attach notes to parents (or to category root if no parent)
        for (const note of notes) {
            const treeNoteId = getNoteTreeItemId(note.id);
            if (note.note_id) {
                noteMap[getNoteTreeItemId(note.note_id)]?.children.push(treeNoteId);
            } else {
                columnsById[getCategoryTreeItemId(note.note_category_id)].children.push(treeNoteId);
            }
        }

        return allItems;
    }, [treeColumns, notes]);

    useEffect(() => {
        // update the selectedNote if the items have changed
        if (selectedNote) {
            const updatedNote = treeItems[getNoteTreeItemId(selectedNote.id)]?.data;
            setSelectedNote(updatedNote);
        }
    }, [selectedNote, treeItems]);

    const getTreeItemByNoteId = useCallback(
        (noteId: number) => {
            return treeItems[getNoteTreeItemId(noteId)] || null;
        },
        [treeItems],
    );

    const findNoteById = useCallback(
        (noteId: number) => {
            return getTreeItemByNoteId(noteId)?.data || null;
        },
        [getTreeItemByNoteId],
    );

    const handleSelectNote = useCallback(
        (note: Note | null) => {
            if (note === selectedNote) {
                setSelectedNote(null);
            } else {
                setSelectedNote(note ?? null);
            }
        },
        [selectedNote],
    );

    const handleNoteTreeItemMove = useCallback(
        async (movedItem: NoteTreeItem, targetTreeItem: HeadlessTreeItem, index: number = 0) => {
            const note = movedItem.data;

            const targetNoteCategory = treeColumns.find((column) => column.id === targetTreeItem.id)?.data;
            const targetNote = (!targetNoteCategory && treeItems[targetTreeItem.id]?.data) ?? undefined;

            onNoteMove?.({ note, parentNoteCategory: targetNoteCategory, parentNote: targetNote, sort_order: index });
        },
        [onNoteMove, treeColumns, treeItems],
    );

    return (
        <CampaignContext
            value={{
                campaign,
                treeColumns,
                treeItems,
                selectedNote,
                findNoteById,
                getTreeItemByNoteId,
                handleSelectNote,
                handleNoteTreeItemMove,
            }}
        >
            {children}
        </CampaignContext>
    );
}

function useCampaign(): CampaignContextType {
    const context = useContext(CampaignContext);

    if (context === undefined) {
        throw new Error('useCampaign must be used within a CampaignProvider');
    }

    return context as CampaignContextType;
}

export { CampaignProvider, useCampaign };
export type { CampaignContextType, MoveNoteType };
