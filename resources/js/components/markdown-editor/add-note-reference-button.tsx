import { useState } from 'react';

import { CheckIcon, NotebookIcon, XIcon } from 'lucide-react';
import { Button, SimpleDialog } from 'shanty-ui';

import { Note } from '@/types/models/note';

import { SearchNote } from '../search-note/search-note';

function AddNoteReferenceButton({ onSelectNote }: { onSelectNote?: (text: string) => void }) {
    const [selectedNote, setSelectedNote] = useState<Note | null>(null);

    const submit = () => {
        if (!selectedNote) return;

        onSelectNote?.(`:note[${''}]{id=${selectedNote.id}}`);
    };

    return (
        <SimpleDialog.Root>
            <SimpleDialog.Trigger>
                <Button variant="ghost">
                    <NotebookIcon />
                </Button>
            </SimpleDialog.Trigger>
            <SimpleDialog.Popup>
                <SimpleDialog.Header title="Référencer une note" />

                <SearchNote onSelectNote={setSelectedNote} />

                <SimpleDialog.Footer className="">
                    <SimpleDialog.Close>
                        <Button variant="ghost">
                            <XIcon />
                        </Button>
                    </SimpleDialog.Close>
                    <SimpleDialog.Close>
                        <Button variant="ghost" onClick={submit} disabled={!selectedNote}>
                            <CheckIcon />
                        </Button>
                    </SimpleDialog.Close>
                </SimpleDialog.Footer>
            </SimpleDialog.Popup>
        </SimpleDialog.Root>
    );
}

export { AddNoteReferenceButton };
