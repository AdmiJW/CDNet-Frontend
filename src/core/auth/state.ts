import { atom } from 'jotai';
import { useAtomValue, useSetAtom } from 'jotai';

export const COOKIE_JWT_KEY = 'jwt-token';

export type AuthUser = {
    id: number;
    username: string;
};

export const jwtAtom = atom<string | null>(null);
export const useJWT = () => useAtomValue(jwtAtom);
export const useSetJWT = () => useSetAtom(jwtAtom);
export const userAtom = atom<AuthUser | null>(null);
export const useUser = () => useAtomValue(userAtom);
export const useSetUser = () => useSetAtom(userAtom);
