import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/')({
    component: () => <div>To Be Completed</div>,
});
