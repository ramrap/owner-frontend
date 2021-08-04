import Head from "next/head";

import "@styles/fonts.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@styles/global.css";
import "@styles/custom.css";

import "@styles/flickity.css";
import "@styles/misc.css";

import { PageTransition } from "next-page-transitions";
import AuthProvider from "context/auth/authProvider";
import SessionProvider from "context/session/sessionProvider";

function MyApp({ Component, pageProps, router }) {
    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <PageTransition timeout={300} classNames="page-transition">
                <SessionProvider>
                    <AuthProvider>
                        <Component {...pageProps} key={router.route} />
                    </AuthProvider>
                </SessionProvider>
            </PageTransition>
            <style jsx global>{`
                .page-transition-enter {
                    opacity: 0;
                    transform: translate3d(0, 20px, 0);
                }
                .page-transition-enter-active {
                    opacity: 1;
                    transform: translate3d(0, 0, 0);
                    transition: opacity 300ms, transform 300ms;
                }
                .page-transition-exit {
                    opacity: 1;
                }
                .page-transition-exit-active {
                    opacity: 0;
                }
            `}</style>
        </>
    );
}

export default MyApp;
