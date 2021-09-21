import Head from "next/head";

import "@styles/fonts.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@styles/global.css";
import "@styles/custom.css";

import "@styles/flickity.css";

import { PageTransition } from "next-page-transitions";
import AuthProvider from "context/auth/authProvider";
import SessionProvider from "context/session/sessionProvider";
import Layout from "@components/UI/Layout";

function MyApp({ Component, pageProps, router }) {
    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <SessionProvider>
                <AuthProvider>
                
                    <Layout>
                        
                            <Component {...pageProps} key={router.route} />

                    </Layout>
                    
                </AuthProvider>
            </SessionProvider>
            <style jsx global>{`

            `}</style>
        </>
    );
}

export default MyApp;
