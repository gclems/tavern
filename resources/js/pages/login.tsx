import { FormEventHandler } from 'react';

import { Link, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { Button, Input, Label, Password } from 'shanty-ui';

import FormField from '@/components/form-field';
import InputError from '@/components/input-error';
import PublicLayout from '@/layouts/public';

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

const Login: React.FC<LoginProps> = ({ status }) => {
    const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
        email: '',
        password: '',
        remember: false,
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            preserveState: false,
            onFinish: () => reset('password'),
        });
    };

    return (
        <PublicLayout title="Tavern - Crafted tale" description="Connexion">
            <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                    <FormField>
                        <Label htmlFor="email" required>
                            Adresse e-mail
                        </Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            autoFocus
                            required
                            tabIndex={1}
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
                            name="password"
                            required
                            tabIndex={2}
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            disabled={processing}
                            placeholder="Password"
                        />
                    </FormField>

                    <Button variant="primary" type="submit" className="mt-4 w-full" tabIndex={4} disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Se connecter
                    </Button>

                    <Button
                        type="button"
                        variant="link"
                        className="mt-4 w-full"
                        tabIndex={5}
                        disabled={processing}
                        render={<Link href={route('register')}>Créer un compte</Link>}
                    />
                </div>
            </form>

            {status && <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>}
        </PublicLayout>
    );
};

export default Login;
