import { useEffect } from 'react';
import cookie from 'js-cookie';
import { Paper, Loader } from '@mantine/core';
import { useNavigate } from '@tanstack/react-router';
import { useTranslation } from '@core/i18next';
import { COOKIE_JWT_KEY, useSetJWT } from './state';

export function Logout() {
    const navigate = useNavigate();
    const setJWT = useSetJWT();
    const { t } = useTranslation(undefined, { keyPrefix: 'auth' });

    useEffect(() => {
        cookie.remove(COOKIE_JWT_KEY);
        setJWT(null);
        navigate({ to: '/login' });
    }, [navigate, setJWT]);

    return (
        <div className="flex flex-1 items-center justify-center">
            <Paper className="relative flex flex-col items-center gap-4 p-8" shadow="sm" withBorder>
                <Loader />
                <div className="text-lg font-medium">{t('loggingOut')}</div>
            </Paper>
        </div>
    );
}
