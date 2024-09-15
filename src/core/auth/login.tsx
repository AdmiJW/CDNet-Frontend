import { Paper, TextInput, Button, LoadingOverlay } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useMutation } from '@tanstack/react-query';
import { useSearch, useNavigate } from '@tanstack/react-router';
import { showNotification } from '@mantine/notifications';
import { useTranslation } from '@core/i18next';
import { z, validate } from '@core/zod';
import { axios, type AxiosError } from '@core/axios';
import { useSetUser, type AuthUser } from './state';

import network from '@core/assets/img/network.png';

type LoginForm = {
    username: string;
    password: string;
};

export function Login() {
    const setUser = useSetUser();
    const { redirect } = useSearch({ from: '/login' });
    const navigate = useNavigate();
    const { t: tc } = useTranslation(undefined, { keyPrefix: 'common' });
    const { t } = useTranslation(undefined, { keyPrefix: 'auth' });

    const form = useForm<LoginForm>({
        mode: 'uncontrolled',
        initialValues: { username: '', password: '' },
        validate: {
            username: (v) => validate(z.string().min(3), v),
            password: (v) => validate(z.string().min(8), v),
        },
    });

    const { mutate, isPending } = useMutation({
        mutationFn: async (values: LoginForm) => {
            await axios.post('/auth/login', values);
            const res = await axios.get<AuthUser>('/auth');
            const user = res.data;
            setUser(user);
            return user;
        },
        onSuccess: (user) => {
            showNotification({
                color: 'green',
                message: t('successLogin', { username: user.username }),
            });
            const redirectPath = redirect || '/';
            navigate({ to: redirectPath });
        },
        onError: (error) => {
            const is401 = (error as AxiosError).response?.status === 401;
            if (is401) {
                showNotification({ color: 'red', message: t('invalidCredentials') });
                return;
            }
            console.error(error);
            showNotification({ color: 'red', message: t('errorAuthentication') });
        },
    });

    return (
        <div className="flex flex-1 items-center justify-center">
            <Paper className="relative" shadow="sm" withBorder>
                <LoadingOverlay visible={isPending} />
                <div className="flex flex-wrap items-center gap-4 rounded-t-md bg-yellow-400 p-6 dark:bg-yellow-500">
                    <img src={network} alt="network" className="h-10 w-10" />
                    <h1 className="text-3xl font-bold text-white">CDNet</h1>
                </div>
                <h1 className="px-6 pt-4 text-center text-2xl font-bold">{tc('login')}</h1>
                <form
                    className="flex flex-col gap-2 p-4 pt-2"
                    onSubmit={form.onSubmit((values) => mutate(values))}
                >
                    <TextInput
                        required
                        withAsterisk
                        label={tc('username')}
                        key={form.key('username')}
                        {...form.getInputProps('username')}
                    />
                    <TextInput
                        required
                        withAsterisk
                        type="password"
                        label={tc('password')}
                        key={form.key('password')}
                        {...form.getInputProps('password')}
                    />
                    <Button type="submit" className="mt-4 w-full">
                        {tc('login')}
                    </Button>
                </form>
            </Paper>
        </div>
    );
}
