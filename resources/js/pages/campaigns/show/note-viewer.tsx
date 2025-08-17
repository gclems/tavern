import { useState } from 'react';

import { MaximizeIcon, MinimizeIcon } from 'lucide-react';
import { Button, cn } from 'shanty-ui';

import { Note } from '@/types/models/note';

function NoteViewer({ note }: { note: Note | null }) {
    const [fullScreenMode, setFullScreenMode] = useState<boolean>(false);

    return (
        <div
            className={cn('bg-dnd-background text-dnd-foreground border-dnd-primary flex flex-col overflow-x-hidden overflow-y-auto border-4', {
                'fixed inset-0': fullScreenMode,
                'max-h-full min-h-full w-1/2 max-w-[600px]': !fullScreenMode,
            })}
        >
            {note && (
                <div>
                    <div className="flex items-center justify-between px-4 py-2">
                        <div className="text-dnd-primary text-2xl font-bold">{note.name}</div>
                        <Button variant="ghost" onClick={() => setFullScreenMode(!fullScreenMode)}>
                            {fullScreenMode ? <MinimizeIcon /> : <MaximizeIcon />}
                        </Button>
                    </div>
                    <div className="border-dnd-primary border-b-4" />
                </div>
            )}
        </div>
    );
}

export { NoteViewer };
