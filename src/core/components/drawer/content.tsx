import { Divider } from '@mantine/core';
import { motion, type Variants } from 'framer-motion';
import { IconHome, IconUsers, IconShield, IconLogin, IconLogout } from '@tabler/icons-react';
import { useTranslation } from '@core/i18next';
import { useUser } from '@core/auth';
import { useIsExpand } from './state';
import { DrawerHeader } from './header';
import { DrawerLink } from './link';

const container: Variants = {
    hidden: {},
    visible: {
        transition: { delayChildren: 0.15, staggerChildren: 0.1, type: 'spring', duration: 0.3 },
    },
};

function DrawerMenu() {
    const isExpand = useIsExpand();
    const user = useUser();

    const { t: tc } = useTranslation(undefined, { keyPrefix: 'common' });

    return (
        <motion.div
            className="flex flex-1 flex-col"
            variants={container}
            animate={isExpand ? 'visible' : 'hidden'}
        >
            {user ? (
                <>
                    <DrawerLink
                        href="/"
                        label={tc('dashboard')}
                        leftSection={<IconHome stroke={1.7} size={24} />}
                    />
                    <DrawerLink
                        href="/users"
                        label={tc('users')}
                        leftSection={<IconUsers stroke={1.7} size={24} />}
                    />
                    <DrawerLink
                        href="/admins"
                        label={tc('admins')}
                        leftSection={<IconShield stroke={1.7} size={24} />}
                    />
                </>
            ) : (
                <DrawerLink
                    href="/login"
                    label={tc('login')}
                    leftSection={<IconLogin stroke={1.7} size={24} />}
                />
            )}
            <div className="flex-1" />
            <Divider />

            {user && (
                <DrawerLink
                    href="/logout"
                    label={tc('logout')}
                    leftSection={<IconLogout stroke={1.7} size={24} />}
                />
            )}
        </motion.div>
    );
}

export function DrawerContent() {
    return (
        <div className="flex h-full flex-col">
            <DrawerHeader />
            <DrawerMenu />
        </div>
    );
}
