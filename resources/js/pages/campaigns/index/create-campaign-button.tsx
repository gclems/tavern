import { FormEventHandler, useState } from 'react';

import { useForm } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { Button, Input, Label, SimpleSheet, useToastManager } from 'shanty-ui';

import FormField from '@/components/form-field';
import InputError from '@/components/input-error';

type Form = {
    name: string;
};

const CreateCampaignButton: React.FC = () => {
    const [opened, setOpened] = useState(false);
    const toast = useToastManager();

    const { data, setData, post, processing, errors, reset } = useForm<Form>({
        name: '',
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('campaigns.store'), {
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
                <Button variant="ghost">
                    <Plus /> Créer
                </Button>
            </SimpleSheet.Trigger>
            <SimpleSheet.Popup>
                <SimpleSheet.Header title="Créer une campagne" />
                <SimpleSheet.Body>
                    <form onSubmit={handleSubmit}>
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

                            <Button type="submit" className="w-full" disabled={processing}>
                                Valider
                            </Button>
                        </div>
                    </form>
                </SimpleSheet.Body>
            </SimpleSheet.Popup>
        </SimpleSheet.Root>
    );
};

export { CreateCampaignButton };
