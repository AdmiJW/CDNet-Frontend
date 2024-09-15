import { createFileRoute } from '@tanstack/react-router';
import { Login } from '@core/auth';

type Search = {
    redirect?: string;
};

export const Route = createFileRoute('/login')({
    component: () => <Login />,
    validateSearch: (search: Record<string, unknown>): Search => ({
        redirect: (search.redirect as string) || undefined,
    }),
});
