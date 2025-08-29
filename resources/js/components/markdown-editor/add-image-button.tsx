import { useEffect, useState } from 'react';

import { CheckIcon, ImageIcon, XIcon } from 'lucide-react';
import { Button, Input, Label, SimpleDialog } from 'shanty-ui';

import FormField from '../form-field';

function AddImageButton({ onSubmit }: { onSubmit?: (text: string) => void }) {
    const [open, setOpen] = useState<boolean>(false);

    const [url, setUrl] = useState<string>('');

    const handleSubmit = () => {
        onSubmit?.(`![](${url})`);
        setOpen(false);
    };

    useEffect(() => {
        if (open) {
            setUrl('');
        }
    }, [open]);

    return (
        <SimpleDialog.Root open={open} onOpenChange={setOpen}>
            <SimpleDialog.Trigger>
                <Button variant="ghost">
                    <ImageIcon />
                </Button>
            </SimpleDialog.Trigger>
            <SimpleDialog.Popup>
                <SimpleDialog.Header title="Insérer un lien" />

                <div className="space-y-4">
                    <FormField>
                        <Label htmlFor="url" required>
                            URL
                        </Label>
                        <Input
                            id="url"
                            name="url"
                            type="text"
                            required
                            tabIndex={2}
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="https://example.jpg"
                        />
                    </FormField>
                </div>

                <SimpleDialog.Footer className="">
                    <SimpleDialog.Close>
                        <Button variant="ghost">
                            <XIcon />
                        </Button>
                    </SimpleDialog.Close>
                    <Button variant="ghost" onClick={handleSubmit}>
                        <CheckIcon />
                    </Button>
                </SimpleDialog.Footer>
            </SimpleDialog.Popup>
        </SimpleDialog.Root>
    );
}

export { AddImageButton };
