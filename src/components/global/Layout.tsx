import Head from "next/head";
import Header from "@components/global/Header";
import Footer from "@components/global/Footer";
import { ReactElement } from "react";

const Layout = ({ children }: { children: ReactElement }) => {
    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta name="title" content="Git Commit Viewer" />
                <meta name="description" content="Git Commit Viewer" />
                <meta name="keywords" content="Git Commit Viewer" />
                <meta name="theme-color" content="#111111" />
                <meta property="og:title" content="Git Commit Viewer" />
                <meta property="og:description" content="Git Commit Viewer" />
                <meta property="og:image" content="/images/og.jpg" />
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="" />
                {/* <link href="/images/favicon.png" type="image/png" rel="icon" /> */}
                <link href="/images/favicon.ico" rel="icon" />
                <title>Git Commit Viewer</title>
            </Head>
            <Header/>
            <main>
                {children}
            </main>
            <Footer/>
        </>
    )
}

export default Layout;
