import { RouterProvider as RP } from '@tanstack/react-router';
import { router } from '@core/router';

export function RouterProvider() {
    return <RP router={router} />;
}
