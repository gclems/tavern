import { router } from '@inertiajs/react';

import PrivateLayout from '@/layouts/private';
import { Campaign } from '@/types/models/campaign';
import { Note } from '@/types/models/note';
import { NoteCategory } from '@/types/models/noteCategory';

import { CampaignProvider, MoveNoteType } from './campaign-provider';
import { NoteViewer } from './note-viewer';
import { NoteColumnsTrees } from './notes-columns-trees';

interface Props {
    campaign: Campaign;
    noteCategories: NoteCategory[];
    notes: Note[];
}

const CampaignsShowPage: React.FC<Props> = ({ campaign, noteCategories, notes }) => {
    const handleNoteMove = ({ note, sort_order, parentNoteCategory, parentNote }: MoveNoteType) => {
        router.post(route('notes.move', { note: note.id }), {
            parentNoteCategoryId: parentNoteCategory?.id,
            parentNoteId: parentNote?.id,
            sort_order,
        });
        return true;
    };

    return (
        <PrivateLayout title={campaign.name} menuKey="campaigns">
            <CampaignProvider campaign={campaign} noteCategories={noteCategories} notes={notes} onNoteMove={handleNoteMove}>
                <div className="flex max-h-full min-h-full w-full overflow-hidden">
                    <NoteColumnsTrees />
                    <NoteViewer />
                </div>
            </CampaignProvider>
        </PrivateLayout>
    );
};

export default CampaignsShowPage;
