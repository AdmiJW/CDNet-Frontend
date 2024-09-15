import { ModalProps } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from '@core/i18next';
import { axios, type AxiosError } from '@core/axios';
import { userBaseValidator, type UserBase, type User } from './user';
import { UserForm } from './form';
import { useEffect } from 'react';

type UpdateUserProps = {
    userID: number | null;
} & Omit<ModalProps, 'onSubmit' | 'opened'>;

export function UpdateUser({ userID, ...props }: UpdateUserProps) {
    const queryClient = useQueryClient();
    const { t } = useTranslation(undefined, { keyPrefix: 'users' });

    const form = useForm<UserBase>({
        mode: 'uncontrolled',
        initialValues: { username: '', email: '', phone: '', skills: [], hobbies: [] },
        validate: userBaseValidator,
    });

    const { data, isLoading, error } = useQuery({
        queryKey: ['users', userID],
        enabled: !!userID,
        queryFn: async () => {
            const res = await axios.get<User>(`/users/${userID}`);
            const user = res.data;
            form.setValues(user);
            return user;
        },
    });

    useEffect(() => {
        if (!error) return;
        notifications.show({ message: t('errorGetUser'), color: 'red' });
    }, [error, t]);

    const { mutate, isPending } = useMutation({
        mutationFn: async (values: UserBase) => {
            const res = await axios.put<User>(`/users/${userID}`, values);
            const user = res.data;
            return user;
        },
        onSuccess: (user) => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
            props.onClose();
            notifications.show({
                message: t('updateUserSuccess', { username: user?.username }),
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
            notifications.show({ message: t('updateUserError'), color: 'red' });
        },
    });

    return (
        <UserForm
            form={form}
            opened={!!userID}
            isLoading={isPending || isLoading}
            onSubmit={(v) => mutate(v)}
            title={
                <div className="text-lg font-semibold">
                    {t('updateUser', { username: data?.username })}
                </div>
            }
            {...props}
        />
    );
}
