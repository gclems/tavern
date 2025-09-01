import { TrashIcon } from 'lucide-react';
import { Button, SimpleDialog } from 'shanty-ui';

import { Note } from '@/types/models/note';

import { useCampaign } from './campaign-provider';

function DeleteNoteButton({ note }: { note: Note }) {
    const { deleteNote } = useCampaign();

    return (
        <SimpleDialog.Root>
            <SimpleDialog.Trigger>
                <Button variant="ghost" className="hover:text-destructive-foreground hover:bg-destructive">
                    <TrashIcon />
                </Button>
            </SimpleDialog.Trigger>
            <SimpleDialog.Popup>
                <SimpleDialog.Header title="Supprimer une note" />
                <div className="text-center">
                    <p>
                        Êtes-vous sûr de vouloir supprimer la note
                        <br />
                        <span className="text-2xl">
                            <strong>
                                <i>{note.name}</i>
                            </strong>
                        </span>
                        <br />
                        et toutes les notes qu'elle contient ?
                    </p>
                    <p className="mt-4">
                        <strong>Cette action est irréversible.</strong>
                    </p>
                </div>
                <SimpleDialog.Footer>
                    <Button variant="ghost" onClick={() => {}}>
                        Annuler
                    </Button>
                    <Button variant="destructive" onClick={() => deleteNote(note)}>
                        Supprimer
                    </Button>
                </SimpleDialog.Footer>
            </SimpleDialog.Popup>
        </SimpleDialog.Root>
    );
}

export { DeleteNoteButton };
