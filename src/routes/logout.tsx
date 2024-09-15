import { createFileRoute } from '@tanstack/react-router';
import { Logout } from '@core/auth';

export const Route = createFileRoute('/logout')({
    component: () => <Logout />,
});
