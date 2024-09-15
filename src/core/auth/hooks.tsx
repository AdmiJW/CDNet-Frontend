import { useEffect } from 'react';
import cookie from 'js-cookie';
import { useNavigate } from '@tanstack/react-router';
import { notifications } from '@mantine/notifications';
import { axios } from '@core/axios';
import { translate } from '@core/i18next';
import { useSetUser, useJWT, useSetJWT, COOKIE_JWT_KEY, type AuthUser } from './state';

const API_WHOAMI = '/auth';

// On app initialization, pulls the cookie's JWT token and loads into the jotai atom
export function useInitializeJWT() {
    const setJWT = useSetJWT();

    useEffect(() => {
        const token = cookie.get(COOKIE_JWT_KEY);
        if (token) setJWT(token);
    }, [setJWT]);
}

// Whenever JWT token changes, update the user atom.
export function useAutomaticUserUpdate() {
    const token = useJWT();
    const setUser = useSetUser();
    const navigate = useNavigate();

    useEffect(() => {
        const t = (key: string) => translate(`auth.${key}`);

        if (!token) {
            setUser(null);
            return;
        }

        axios
            .get<AuthUser>(API_WHOAMI)
            .then((response) => {
                const user = response.data;
                setUser(user);
                notifications.show({
                    color: 'green',
                    message: (
                        <div>
                            <div>{t('welcome')}</div>
                            <div className="text-base font-semibold">{user.username}</div>
                        </div>
                    ),
                });
            })
            .catch((error) => {
                console.error(error);
                setUser(null);
                notifications.show({ message: t('errorAuthentication'), color: 'red' });
            });
    }, [token, setUser, navigate]);
}
