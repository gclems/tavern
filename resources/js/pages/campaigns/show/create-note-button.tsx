import { FormEventHandler, useState } from 'react';

import { useForm } from '@inertiajs/react';
import { PlusIcon } from 'lucide-react';
import { Button, Input, Label, RadioTab, SimpleSheet, useToastManager } from 'shanty-ui';

import FormField from '@/components/form-field';
import InputError from '@/components/input-error';
import { Privacy } from '@/types/enums/privacy';

type Form = {
    note_category_id: number;
    note_id?: number;
    name: string;
    privacy: Privacy;
};

function CreateNoteButton({ campaignId, noteCategoryId, noteId }: { campaignId: number; noteCategoryId: number; noteId?: number }) {
    const [opened, setOpened] = useState(false);
    const toast = useToastManager();

    const { data, setData, post, processing, errors, reset } = useForm<Form>({
        name: '',
        privacy: Privacy.Public,
        note_category_id: noteCategoryId,
        note_id: noteId,
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('campaigns.notes.store', campaignId), {
            preserveState: false,
            onSuccess: () => {
                setOpened(false);
            },
            onError: (err) => {
                toast.add({ description: 'Une erreur est survenue' });
                console.log('Error', err);
            },
        });
    };

    return (
        <SimpleSheet.Root
            open={opened}
            onOpenChange={(o) => {
                setOpened(o);
                reset();
            }}
        >
            <SimpleSheet.Trigger>
                <Button variant="link">
                    <PlusIcon />
                </Button>
            </SimpleSheet.Trigger>
            <SimpleSheet.Popup>
                <SimpleSheet.Header title="Créer une note" />
                <SimpleSheet.Body>
                    <form onSubmit={handleSubmit}>
                        <input type="hidden" name="note_category_id" value={data.note_category_id} />
                        {noteId && <input type="hidden" name="note_id" value={data.note_id} />}
                        <div className="space-y-4">
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
                                <RadioTab.Root
                                    id="privacy"
                                    name="privacy"
                                    value={data.privacy}
                                    onValueChange={(v) => setData('privacy', v as Privacy)}
                                >
                                    <RadioTab.Radio value={Privacy.Public}>Public</RadioTab.Radio>
                                    <RadioTab.Radio value={Privacy.Private}>Privé</RadioTab.Radio>
                                </RadioTab.Root>
                                <InputError message={errors.name} />
                            </FormField>

                            <Button type="submit" className="w-full" disabled={processing}>
                                Valider
                            </Button>
                        </div>
                    </form>
                </SimpleSheet.Body>
            </SimpleSheet.Popup>
        </SimpleSheet.Root>
    );
}

export { CreateNoteButton };
