import { useEffect, useState } from 'react';

import { CheckIcon, LinkIcon, XIcon } from 'lucide-react';
import { Button, Input, Label, SimpleDialog } from 'shanty-ui';

import FormField from '../form-field';

function AddLinkButton({ onSubmit }: { onSubmit?: (text: string) => void }) {
    const [open, setOpen] = useState<boolean>(false);

    const [text, setText] = useState<string>('');
    const [url, setUrl] = useState<string>('');

    const handleSubmit = () => {
        onSubmit?.(`[${text}](${url})`);
        setOpen(false);
    };

    useEffect(() => {
        if (open) {
            setText('');
            setUrl('');
        }
    }, [open]);

    return (
        <SimpleDialog.Root open={open} onOpenChange={setOpen}>
            <SimpleDialog.Trigger>
                <Button variant="ghost">
                    <LinkIcon />
                </Button>
            </SimpleDialog.Trigger>
            <SimpleDialog.Popup>
                <SimpleDialog.Header title="Insérer un lien" />

                <div className="space-y-4">
                    <FormField>
                        <Label htmlFor="text" required>
                            Texte
                        </Label>
                        <Input
                            id="text"
                            name="text"
                            type="text"
                            autoFocus
                            required
                            tabIndex={1}
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Saisir un text"
                        />
                    </FormField>

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
                            placeholder="https://example.com"
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

export { AddLinkButton };
