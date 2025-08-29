import { useState } from 'react';

import { CheckIcon, NotebookIcon, XIcon } from 'lucide-react';
import { Button, SimpleDialog } from 'shanty-ui';

import { Note } from '@/types/models/note';

import { SearchNote } from '../search-note/search-note';

function AddNoteReferenceButton({ onSelectNote }: { onSelectNote?: (text: string) => void }) {
    const [selectedNote, setSelectedNote] = useState<Note | null>(null);
    const [open, setOpen] = useState<boolean>(false);

    const submit = (note: Note | null) => {
        if (!note) return;
        onSelectNote?.(`:note[]{id=${note.id}}`);
        setOpen(false);
    };

    return (
        <SimpleDialog.Root open={open} onOpenChange={setOpen}>
            <SimpleDialog.Trigger>
                <Button variant="ghost">
                    <NotebookIcon />
                </Button>
            </SimpleDialog.Trigger>
            <SimpleDialog.Popup>
                <SimpleDialog.Header title="Référencer une note" />

                <SearchNote
                    onSelectNote={setSelectedNote}
                    onDoubleClick={(note) => {
                        submit(note);
                    }}
                />

                <SimpleDialog.Footer className="">
                    <SimpleDialog.Close>
                        <Button variant="ghost">
                            <XIcon />
                        </Button>
                    </SimpleDialog.Close>
                    <Button variant="ghost" onClick={() => submit(selectedNote)} disabled={!selectedNote}>
                        <CheckIcon />
                    </Button>
                </SimpleDialog.Footer>
            </SimpleDialog.Popup>
        </SimpleDialog.Root>
    );
}

export { AddNoteReferenceButton };
