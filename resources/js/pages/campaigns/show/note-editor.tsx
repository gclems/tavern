import { FormEventHandler } from 'react';

import { useForm } from '@inertiajs/react';
import { CheckIcon, XIcon } from 'lucide-react';
import { Button, cn, Input, Label, RadioTab, useToastManager } from 'shanty-ui';

import FormField from '@/components/form-field';
import InputError from '@/components/input-error';
import { MarkdownEditor } from '@/components/markdown-editor/markdown-editor';
import { Privacy } from '@/types/enums/privacy';
import { Note } from '@/types/models/note';

import { DndMarkdown } from '../../../components/dnd-markdown/dnd-markdown';

type Form = {
    name: string;
    content: string;
    privacy: Privacy;
};

function NoteEditor({ note, onClose }: { note: Note; onClose: () => void }) {
    const toast = useToastManager();

    const { data, setData, put, processing, errors } = useForm<Form>({
        name: note.name,
        content: note.content || '',
        privacy: note.privacy,
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        put(route('notes.update', note.id), {
            onSuccess: () => {
                onClose?.();
            },
            onError: (err) => {
                toast.add({ description: 'Une erreur est survenue' });
                console.log('Error', err);
            },
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className={cn('flex max-h-full min-h-full w-1/2 max-w-[600px]')}>
                <div
                    className={cn(
                        'bg-dnd-background text-dnd-foreground border-dnd-primary flex flex-col overflow-x-hidden overflow-y-auto border-4',
                        'fixed top-0 right-0 bottom-0 left-1/2',
                    )}
                >
                    <div className="flex flex-col overflow-hidden">
                        <div className="flex items-center justify-between px-4 py-2">
                            <div className="text-dnd-primary text-2xl font-bold">{data.name}</div>
                            <div className="flex">
                                <Button variant="ghost" type="submit">
                                    <CheckIcon />
                                </Button>
                                <Button variant="ghost" onClick={onClose}>
                                    <XIcon />
                                </Button>
                            </div>
                        </div>
                        <div className="border-dnd-primary border-b-4" />
                        <div className="flex flex-col overflow-y-auto p-4">
                            <DndMarkdown markdown={data.content} />
                        </div>
                    </div>
                </div>
                <div
                    className={cn(
                        'bg-dnd-background text-dnd-foreground border-dnd-primary flex flex-col overflow-x-hidden overflow-y-auto border-4',
                        'fixed top-0 right-1/2 bottom-0 left-0 p-4',
                    )}
                >
                    <div className="flex h-full flex-col space-y-4">
                        <FormField>
                            <Label htmlFor="name" required>
                                Nom
                            </Label>
                            <Input
                                id="name"
                                name="name"
                                type="text"
                                required
                                autoFocus
                                tabIndex={1}
                                value={data.name}
                                autoComplete="off"
                                onChange={(e) => setData('name', e.target.value)}
                                disabled={processing}
                                placeholder="Nom"
                            />
                            <InputError message={errors.name} />
                        </FormField>

                        <FormField>
                            <Label htmlFor="privacy" required>
                                Visibilité
                            </Label>
                            <RadioTab.Root id="privacy" name="privacy" value={data.privacy} onValueChange={(v) => setData('privacy', v as Privacy)}>
                                <RadioTab.Radio value={Privacy.Public}>Public</RadioTab.Radio>
                                <RadioTab.Radio value={Privacy.Private}>Privé</RadioTab.Radio>
                            </RadioTab.Root>
                            <InputError message={errors.name} />
                        </FormField>

                        <FormField className="flex grow flex-col">
                            <MarkdownEditor
                                id="content"
                                name="content"
                                required
                                autoFocus
                                tabIndex={1}
                                value={data.content}
                                autoComplete="off"
                                className="h-full"
                                onChange={(e) => setData('content', e.target.value)}
                                disabled={processing}
                                placeholder="Nom"
                            />
                            <InputError message={errors.content} />
                        </FormField>
                    </div>
                </div>
            </div>
        </form>
    );
}

export { NoteEditor };
