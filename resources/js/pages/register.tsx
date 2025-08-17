import { FormEventHandler } from 'react';

import { Link, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { Button, Input, Label, Password } from 'shanty-ui';

import FormField from '@/components/form-field';
import InputError from '@/components/input-error';
import PublicLayout from '@/layouts/public';

type RegisterForm = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
};

const Register: React.FC = () => {
    const { data, setData, post, processing, errors, reset } = useForm<Required<RegisterForm>>({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'), {
            preserveState: false,
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <PublicLayout title="Tavern - Crafted tale" description="Créer un compte">
            <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                    <FormField>
                        <Label htmlFor="name" required>
                            Nom
                        </Label>
                        <Input
                            id="name"
                            type="text"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            disabled={processing}
                            placeholder="Nom complet"
                        />
                        {<InputError message={errors.name} />}
                    </FormField>

                    <FormField>
                        <Label htmlFor="email" required>
                            Adresse e-mail
                        </Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            required
                            tabIndex={2}
                            autoComplete="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            disabled={processing}
                            placeholder="email@example.com"
                        />
                        {<InputError message={errors.email} />}
                    </FormField>

                    <FormField>
                        <Label htmlFor="password" required>
                            Mot de passe
                        </Label>
                        <Password
                            id="password"
                            required
                            tabIndex={3}
                            autoComplete="new-password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            disabled={processing}
                            placeholder="Mot de passe"
                        />
                        <InputError message={errors.password} />
                    </FormField>

                    <FormField>
                        <Label htmlFor="password_confirmation" required>
                            Confirmation du mot de passe
                        </Label>
                        <Password
                            id="password_confirmation"
                            required
                            tabIndex={4}
                            autoComplete="new-password"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            disabled={processing}
                            placeholder="Confirmation"
                        />
                        <InputError message={errors.password_confirmation} />
                    </FormField>

                    <Button variant="primary" type="submit" className="mt-2 w-full" tabIndex={5} disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Créer le compte
                    </Button>

                    <Button
                        type="button"
                        variant="link"
                        className="mt-4 w-full"
                        tabIndex={5}
                        disabled={processing}
                        render={<Link href={route('login')}>J'ai déjà un compte</Link>}
                    />
                </div>
            </form>
        </PublicLayout>
    );
};

export default Register;
