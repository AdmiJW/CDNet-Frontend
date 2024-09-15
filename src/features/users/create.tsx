import { ModalProps } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from '@core/i18next';
import { axios, type AxiosError } from '@core/axios';
import { userBaseValidator, type UserBase, type User } from './user';
import { UserForm } from './form';

type CreateUserProps = Omit<ModalProps, 'onSubmit'>;

export function CreateUser({ ...props }: CreateUserProps) {
    const queryClient = useQueryClient();
    const { t } = useTranslation(undefined, { keyPrefix: 'users' });

    const form = useForm<UserBase>({
        mode: 'uncontrolled',
        initialValues: { username: '', email: '', phone: '', skills: [], hobbies: [] },
        validate: userBaseValidator,
    });

    const { mutate, isPending } = useMutation({
        mutationFn: async (values: UserBase) => {
            const res = await axios.post<User>('/users', values);
            const user = res.data;
            return user;
        },
        onSuccess: (user) => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
            props.onClose();
            notifications.show({
                message: t('createUserSuccess', { username: user?.username }),
                color: 'green',
            });
            form.reset();
        },
        onError: (error) => {
            if ((error as AxiosError).response?.status === 400) {
                const data = (error as AxiosError).response?.data as Record<string, string[]>;
                const formatted = Object.fromEntries(
                    Object.entries(data).map(([k, v]) => [k.toLowerCase(), v[0]])
                );
                form.setErrors(formatted);
                return;
            }

            console.error(error);
            notifications.show({ message: t('createUserError'), color: 'red' });
        },
    });

    return (
        <UserForm
            form={form}
            isLoading={isPending}
            onSubmit={(v) => mutate(v)}
            title={<div className="text-lg font-semibold">{t('createUser')}</div>}
            {...props}
        />
    );
}
