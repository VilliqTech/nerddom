/// <reference types="vite/client" />
import * as React from 'react';
import { createRootRoute, HeadContent, Link, Outlet, Scripts } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { createServerFn } from '@tanstack/react-start';
import { Navbar } from '@/components/Navigation/Navbar';
import { DefaultCatchBoundary } from '../components/DefaultCatchBoundary';
import { NotFound } from '../components/NotFound';
import appCss from '../styles/app.css?url';
import { seo } from '../utils/seo';
import { getSupabaseServerClient } from '../utils/supabase';

const fetchUser = createServerFn({ method: 'GET' }).handler(async () => {
    const supabase = await getSupabaseServerClient();
    const { data, error: _error } = await supabase.auth.getUser();

    if (!data.user?.email) {
        return null;
    }

    return {
        email: data.user.email,
    };
});

export const Route = createRootRoute({
    head: () => ({
        meta: [
            {
                charSet: 'utf-8',
            },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
            },
            ...seo({
                title: 'The Nerddom | Explore your interests',
                description: 'The Nerddom brings you relevant media content',
            }),
        ],
        links: [
            { rel: 'stylesheet', href: appCss },
            {
                rel: 'apple-touch-icon',
                sizes: '180x180',
                href: '/apple-touch-icon.png',
            },
            {
                rel: 'icon',
                type: 'image/png',
                sizes: '32x32',
                href: '/favicon-32x32.png',
            },
            {
                rel: 'icon',
                type: 'image/png',
                sizes: '16x16',
                href: '/favicon-16x16.png',
            },
            { rel: 'manifest', href: '/site.webmanifest', color: '#fffff' },
            { rel: 'icon', href: '/favicon.ico' },
        ],
    }),
    beforeLoad: async () => {
        const user = await fetchUser();

        return {
            user,
        };
    },
    errorComponent: (props) => {
        return (
            <RootDocument>
                <DefaultCatchBoundary {...props} />
            </RootDocument>
        );
    },
    notFoundComponent: () => <NotFound />,
    component: RootComponent,
});

function RootComponent() {
    return (
        <RootDocument>
            <Outlet />
        </RootDocument>
    );
}

function RootDocument({ children }: { children: React.ReactNode }) {
    const { user } = Route.useRouteContext();

    return (
        <html lang='en' suppressHydrationWarning>
            <head>
                <HeadContent />
            </head>
            <body className='min-h-screen bg-background font-sans antialiased'>
                {/* Main App Layout */}
                <div className='relative flex min-h-screen flex-col bg-background'>
                    {/* Navigation Header */}
                    <header className='sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
                        <Navbar />
                    </header>

                    {/* Main Content Area */}
                    <main className='flex-1'>{children}</main>

                    {/* Optional Footer */}
                    {/* <footer className="border-t border-border/40">
                        <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
                            <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
                                <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                                    Built with ❤️ using TanStack Start and Shadcn/ui
                                </p>
                            </div>
                        </div>
                    </footer> */}
                </div>

                {/* Development Tools */}
                <TanStackRouterDevtools position='bottom-right' />
                <Scripts />
            </body>
        </html>
    );
}
