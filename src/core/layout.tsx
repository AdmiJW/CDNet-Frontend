import { TransitionOutlet } from '@core/components/outlet';
import {
    MantineProvider,
    JotaiStoreProvider,
    I18nProvider,
    ReactQueryProvider,
    AuthProvider,
} from '@core/components/providers';
import { DrawerLayout } from '@core/components/drawer';
import { Navbar } from '@core/components/navbar';
import { Footer } from '@core/components/footer';

// Due to how reduce works, the order of the providers is reversed.
const providers = [
    AuthProvider,
    ReactQueryProvider,
    I18nProvider,
    MantineProvider,
    JotaiStoreProvider,
];

function Providers({ children }: { children: React.ReactNode }) {
    return providers.reduce((acc, Provider) => <Provider>{acc}</Provider>, children);
}

export function Layout() {
    return (
        <Providers>
            <DrawerLayout>
                <div className="flex min-h-screen flex-col gap-4 p-4">
                    <Navbar />
                    <TransitionOutlet />
                </div>
                <Footer />
            </DrawerLayout>
        </Providers>
    );
}
