import Head from "next/head";
import Header from "@components/global/Header";
import Footer from "@components/global/Footer";
import { ReactElement } from "react";
import { globalConfigs } from "config";

const Layout = ({ children }: { children: ReactElement }) => {
    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta name="title" content={globalConfigs.name} />
                <meta name="description" content={globalConfigs.name + "Commits"} />
                <meta name="keywords" content={globalConfigs.name + ", " + "git commit viewer, git, commit, commits, viewer"} />
                <meta name="theme-color" content={globalConfigs.themeColor} />
                <meta property="og:title" content={globalConfigs.name} />
                <meta property="og:description" content={globalConfigs.name + "Commits"}/>
                <meta property="og:image" content={globalConfigs.logo} />
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content={globalConfigs.name} />
                <meta property="og:url" content="" />
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
