import { useAutomaticUserUpdate, useInitializeJWT } from '@core/auth';

export function AuthProvider({ children }: { children: React.ReactNode }) {
    useInitializeJWT();
    useAutomaticUserUpdate();

    return children;
}
