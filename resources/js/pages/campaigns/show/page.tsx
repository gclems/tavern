import { router } from '@inertiajs/react';

import PrivateLayout from '@/layouts/private';
import { Campaign } from '@/types/models/campaign';
import { Note } from '@/types/models/note';
import { NoteCategory } from '@/types/models/noteCategory';

import { CampaignProvider, MoveNoteType } from './campaign-provider';
import { NoteViewer } from './note-viewer';
import { NoteColumns } from './notes-columns';

interface Props {
    campaign: Campaign;
    noteCategories: NoteCategory[];
    notes: Note[];
}

const CampaignsShowPage: React.FC<Props> = ({ campaign, noteCategories, notes }) => {
    const handleNoteMove = ({ note, parentNoteCategory, parentNote }: MoveNoteType) => {
        router.post(route('notes.move', { note: note.id }), {
            parentNoteCategoryId: parentNoteCategory?.id,
            parentNoteId: parentNote?.id,
        });

        return true;
    };

    const handleNoteDelete = (note: Note) => {
        router.delete(route('notes.destroy', { note: note.id }));

        return true;
    };

    const handleMoveCategory = (category: NoteCategory, order: number) => {
        router.put(route('noteCategories.move', { noteCategory: category.id }), {
            sortOrder: order,
        });

        return true;
    };

    return (
        <PrivateLayout title={campaign.name} menuKey="campaigns">
            <CampaignProvider
                campaign={campaign}
                noteCategories={noteCategories}
                notes={notes}
                onNoteMove={handleNoteMove}
                onDeleteNote={handleNoteDelete}
                onMoveCategory={handleMoveCategory}
            >
                <div className="flex w-full flex-1 overflow-auto">
                    <NoteColumns />
                    <NoteViewer />
                </div>
            </CampaignProvider>
        </PrivateLayout>
    );
};

export default CampaignsShowPage;
