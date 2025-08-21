import { useState } from 'react';

import { MaximizeIcon, MinimizeIcon, PenIcon } from 'lucide-react';
import { Button, cn } from 'shanty-ui';

import { useCampaign } from './campaign-provider';
import { NoteEditor } from './note-editor';
import { NoteMarkdown } from './note-markdown';

function NoteViewer() {
    const [fullScreenMode, setFullScreenMode] = useState<boolean>(false);
    const [editMode, setEditMode] = useState<boolean>(false);

    const { selectedNote } = useCampaign();

    return (
        <div
            className={cn({
                'flex max-h-full min-h-full w-1/2 max-w-[600px]': !fullScreenMode,
            })}
        >
            <div
                className={cn('bg-dnd-background text-dnd-foreground border-dnd-primary flex flex-col overflow-x-hidden overflow-y-auto border-4', {
                    'fixed inset-0': fullScreenMode && !editMode,
                    'fixed top-0 right-0 bottom-0 left-1/2': editMode,
                    'w-full': !fullScreenMode && !editMode,
                })}
            >
                {selectedNote && (
                    <div>
                        <div className="flex items-center justify-between px-4 py-2">
                            <div className="text-dnd-primary text-2xl font-bold">{selectedNote.name}</div>
                            <div className="flex">
                                <Button variant="ghost" onClick={() => setEditMode(!editMode)}>
                                    {editMode ? <PenIcon /> : <PenIcon />}
                                </Button>
                                <Button variant="ghost" onClick={() => setFullScreenMode(!fullScreenMode)}>
                                    {fullScreenMode ? <MinimizeIcon /> : <MaximizeIcon />}
                                </Button>
                            </div>
                        </div>
                        <div className="border-dnd-primary border-b-4" />
                        <div className="p-4">
                            <NoteMarkdown markdown={selectedNote.content} />
                        </div>
                    </div>
                )}
            </div>
            {selectedNote && editMode && <NoteEditor note={selectedNote} onClose={() => setEditMode(false)} />}
        </div>
    );
}

export { NoteViewer };
