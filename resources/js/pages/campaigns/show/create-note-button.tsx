import { useState } from 'react';

import { Form } from '@inertiajs/react';
import { PlusIcon } from 'lucide-react';
import { Button, Input, Label, RadioTab, SimpleSheet, SimpleTooltip, useToastManager } from 'shanty-ui';

import FormField from '@/components/form-field';
import InputError from '@/components/input-error';
import { Privacy } from '@/types/enums/privacy';

type Form = {
    note_category_id: number;
    note_id?: number;
    name: string;
    privacy: Privacy;
};

function CreateNoteButton({
    campaignId,
    noteCategoryId,
    noteId,
    className,
}: {
    campaignId: number;
    noteCategoryId: number;
    noteId?: number;
    className?: string;
}) {
    const [opened, setOpened] = useState(false);
    const toast = useToastManager();

    return (
        <SimpleSheet.Root
            open={opened}
            onOpenChange={(o) => {
                setOpened(o);
            }}
        >
            <SimpleTooltip content="Créer une note">
                <SimpleSheet.Trigger>
                    <Button variant="link" className={className}>
                        <PlusIcon />
                    </Button>
                </SimpleSheet.Trigger>
            </SimpleTooltip>
            <SimpleSheet.Popup>
                <SimpleSheet.Header title="Créer une note" />
                <SimpleSheet.Body>
                    <Form
                        action={route('campaigns.notes.store', campaignId)}
                        method="POST"
                        disableWhileProcessing
                        onSuccess={() => {
                            setOpened(false);
                        }}
                        onError={(err) => {
                            toast.add({ description: 'Une erreur est survenue' });
                            console.log('Error', err);
                        }}
                    >
                        {({ errors, processing }) => (
                            <>
                                <input type="hidden" name="note_category_id" value={noteCategoryId} readOnly />
                                {noteId && <input type="hidden" name="note_id" value={noteId} readOnly />}
                                <div className="space-y-4">
                                    <FormField>
                                        <Label htmlFor="name" required>
                                            Nom
                                        </Label>
                                        <Input
                                            id="name"
                                            name="name"
                                            type="text"
                                            defaultValue=""
                                            required
                                            disabled={processing}
                                            autoFocus
                                            tabIndex={1}
                                            autoComplete="off"
                                            placeholder="Nom"
                                        />
                                        <InputError message={errors.name} />
                                    </FormField>
                                    <FormField>
                                        <Label htmlFor="privacy" required>
                                            Visibilité
                                        </Label>
                                        <RadioTab.Root id="privacy" name="privacy" disabled={processing} defaultValue={Privacy.Public}>
                                            <RadioTab.Radio value={Privacy.Public}>Public</RadioTab.Radio>
                                            <RadioTab.Radio value={Privacy.Private}>Privé</RadioTab.Radio>
                                        </RadioTab.Root>
                                        <InputError message={errors.name} />
                                    </FormField>

                                    <Button type="submit" className="w-full" disabled={processing}>
                                        Valider
                                    </Button>
                                </div>
                            </>
                        )}
                    </Form>
                </SimpleSheet.Body>
            </SimpleSheet.Popup>
        </SimpleSheet.Root>
    );
}

export { CreateNoteButton };
