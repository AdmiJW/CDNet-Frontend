import { ActionIcon } from '@mantine/core';
import { IconLock, IconLockOpen } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { useIsExpand, useIsLocked } from './state';

import network from '@core/assets/img/network.png';

export function DrawerHeader() {
    const [isLocked, setIsLocked] = useIsLocked();
    const isExpand = useIsExpand();

    return (
        <div className="flex items-center justify-start gap-4 bg-yellow-400 px-2 py-6 dark:bg-yellow-500">
            <motion.img
                src={network}
                alt="Network"
                className="ml-1 drop-shadow-md"
                animate={{ width: isExpand ? 52 : 32, height: isExpand ? 52 : 32 }}
                transition={{ type: 'spring', duration: 0.3 }}
            />
            <motion.span
                className="text-3xl font-extrabold text-white drop-shadow-md"
                animate={{ x: isExpand ? 0 : -50, opacity: isExpand ? 1 : 0 }}
                style={{ fontFamily: 'Inter' }}
            >
                CDNet
            </motion.span>
            <ActionIcon
                component={motion.button}
                className="absolute right-1 top-1"
                color="gray.0"
                animate={{ opacity: isExpand ? 1 : 0 }}
                variant="subtle"
                onClick={() => setIsLocked((locked) => !locked)}
            >
                {isLocked ? (
                    <IconLock size={18} stroke={2.5} />
                ) : (
                    <IconLockOpen size={18} stroke={2.5} />
                )}
            </ActionIcon>
        </div>
    );
}
