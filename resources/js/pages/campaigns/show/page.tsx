import { useState } from 'react';

import PrivateLayout from '@/layouts/private';
import { Campaign } from '@/types/models/campaign';
import { Note } from '@/types/models/note';
import { NoteCategory } from '@/types/models/noteCategory';

import { NoteViewer } from './note-viewer';
import { NoteArborist } from './notes-arborist';

interface Props {
    campaign: Campaign;
    noteCategories: NoteCategory[];
    notes: Note[];
}

const CampaignsShowPage: React.FC<Props> = ({ campaign, noteCategories, notes }) => {
    const [selectedNote, setSelectedNote] = useState<Note | null>(null);

    return (
        <PrivateLayout title={campaign.name} menuKey="campaigns">
            <div className="flex h-full w-full">
                <NoteArborist
                    campaign={campaign}
                    noteCategories={noteCategories}
                    notes={notes}
                    selectedNote={selectedNote}
                    onSelectNote={(note) => {
                        if (note === selectedNote) {
                            setSelectedNote(null);
                        } else {
                            setSelectedNote(note ?? null);
                        }
                    }}
                />
                <NoteViewer note={selectedNote} />
            </div>
        </PrivateLayout>
    );
};

export default CampaignsShowPage;
