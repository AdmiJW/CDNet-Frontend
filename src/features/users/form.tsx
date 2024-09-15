import {
    Modal,
    ModalProps,
    Button,
    LoadingOverlay,
    TextInput,
    TagsInput,
    Grid,
} from '@mantine/core';
import { type UseFormReturnType } from '@mantine/form';
import { useTranslation } from '@core/i18next';
import { type UserBase } from './user';

type UserFormProps = {
    form: UseFormReturnType<UserBase>;
    isLoading: boolean;
    onSubmit: (values: UserBase) => void;
} & Omit<ModalProps, 'onSubmit'>;

export function UserForm({ form, isLoading, onSubmit, ...props }: UserFormProps) {
    const { t: tc } = useTranslation(undefined, { keyPrefix: 'common' });

    return (
        <Modal size="lg" className="relative" centered withCloseButton {...props}>
            <LoadingOverlay visible={isLoading} />

            <form onSubmit={form.onSubmit(onSubmit)}>
                <Grid gutter="xs">
                    <Grid.Col span={12}>
                        <TextInput
                            required
                            withAsterisk
                            label={tc('username')}
                            key={form.key('username')}
                            {...form.getInputProps('username')}
                        />
                    </Grid.Col>
                    <Grid.Col span={{ xs: 12, md: 6 }}>
                        <TextInput
                            required
                            withAsterisk
                            type="email"
                            label={tc('email')}
                            key={form.key('email')}
                            {...form.getInputProps('email')}
                        />
                    </Grid.Col>
                    <Grid.Col span={{ xs: 12, md: 6 }}>
                        <TextInput
                            required
                            withAsterisk
                            type="tel"
                            label={tc('phone')}
                            key={form.key('phone')}
                            {...form.getInputProps('phone')}
                        />
                    </Grid.Col>
                    <Grid.Col span={12}>
                        <TagsInput
                            required
                            withAsterisk
                            label={tc('skills')}
                            key={form.key('skills')}
                            {...form.getInputProps('skills')}
                        />
                    </Grid.Col>
                    <Grid.Col span={12}>
                        <TagsInput
                            required
                            withAsterisk
                            label={tc('hobbies')}
                            key={form.key('hobbies')}
                            {...form.getInputProps('hobbies')}
                        />
                    </Grid.Col>
                </Grid>

                <div className="mt-4 flex justify-end gap-2">
                    <Button color="gray" variant="subtle" onClick={props.onClose}>
                        {tc('cancel')}
                    </Button>
                    <Button variant="filled" type="submit">
                        {tc('submit')}
                    </Button>
                </div>
            </form>
        </Modal>
    );
}
