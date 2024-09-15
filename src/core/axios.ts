import cookie from 'js-cookie';
import { default as axiosClient, type AxiosError } from 'axios';
import { notifications } from '@mantine/notifications';
import { translate } from '@core/i18next';
import { router } from '@core/router';
import { store } from '@core/store';
import { jwtAtom, COOKIE_JWT_KEY } from '@core/auth';

const baseURL = import.meta.env.VITE_API_BASE_URL;

export { type AxiosError } from 'axios';
export const axios = axiosClient.create({
    baseURL,
    headers: { 'Content-Type': 'application/json' },
});

// On any request, set the JWT token to the Authorization header if it exists
axios.interceptors.request.use(
    (config) => {
        const token = store.get(jwtAtom);
        const header = token ? `Bearer ${token}` : '';
        config.headers.setAuthorization(header);
        return config;
    },
    (error) => Promise.reject(error)
);

// On response, update the JWT token to cookie if it exists
// If status code 401, redirect to login page
axios.interceptors.response.use(
    (response) => {
        const header = response.headers['authorization'];
        if (header) {
            const token = header.split(' ')[1];
            cookie.set(COOKIE_JWT_KEY, token);
            store.set(jwtAtom, token);
        }
        return response;
    },
    (error) => {
        const location = router.latestLocation.pathname;
        const is401 = (error as AxiosError)?.response?.status === 401;

        if (is401 && location !== '/login') {
            const t = (key: string) => translate(`auth.${key}`);
            notifications.show({ message: t('loggedOut'), color: 'red' });
            router.navigate({ to: '/login', search: { redirect: location } });
        }

        return Promise.reject(error);
    }
);
