import type { NextPage } from "next";
import Head from "next/head";

//@ts-ignore
const Error: NextPage = ({ statusCode }) => {
    return (
        <section id="error-page">
            <Head>
                <title>{statusCode}</title>
            </Head>
            <h1>{statusCode}</h1>
        </section>
    )
}

Error.getInitialProps = ({ res, err }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404
    return { statusCode }
}

export default Error
