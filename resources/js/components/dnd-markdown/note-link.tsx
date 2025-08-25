import { useCampaign } from '@/pages/campaigns/show/campaign-provider';

function NoteLink({ noteId, children }: { noteId: number; children: React.ReactNode }) {
    const { findNoteById, handleSelectNote } = useCampaign();

    const note = findNoteById(noteId);

    return (
        <button type="button" className="text-dnd-primary cursor-pointer hover:underline" onClick={note ? () => handleSelectNote(note) : undefined}>
            {children ?? note?.name}
        </button>
    );
}

export { NoteLink };
