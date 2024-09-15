import { Modal, ModalProps, Alert, Button, LoadingOverlay } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axios } from '@core/axios';
import { useTranslation } from '@core/i18next';
import { User } from './user';

type DeleteUserProps = {
    user: User | null;
} & Omit<ModalProps, 'opened'>;

export function DeleteUser({ user, ...props }: DeleteUserProps) {
    const queryClient = useQueryClient();
    const { t: tc } = useTranslation(undefined, { keyPrefix: 'common' });
    const { t } = useTranslation(undefined, { keyPrefix: 'users' });
    const title = t('deleteTitle', { username: user?.username });

    const { mutate, isPending } = useMutation({
        mutationFn: async () => {
            await axios.delete(`/users/${user?.id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
            props.onClose();
            notifications.show({
                message: t('deleteSuccess', { username: user?.username }),
                color: 'green',
            });
        },
        onError: (error) => {
            console.error(error);
            notifications.show({ message: t('deleteError'), color: 'red' });
        },
    });

    return (
        <Modal
            className="relative"
            opened={!!user}
            centered
            withCloseButton
            title={<span className="text-lg font-semibold">{title}</span>}
            {...props}
        >
            <LoadingOverlay visible={isPending} />

            <Alert variant="light" color="red">
                {t('deleteMessage', { username: user?.username })}
            </Alert>
            <div className="mt-4 flex justify-end gap-2">
                <Button color="gray" variant="subtle" onClick={props.onClose}>
                    {tc('cancel')}
                </Button>
                <Button color="red" onClick={() => mutate()}>
                    {tc('delete')}
                </Button>
            </div>
        </Modal>
    );
}
