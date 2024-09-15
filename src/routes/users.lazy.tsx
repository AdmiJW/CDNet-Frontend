import { createLazyFileRoute } from '@tanstack/react-router';
import { UsersTable } from '@feat/users';

export const Route = createLazyFileRoute('/users')({
    component: () => <UsersTable />,
});
