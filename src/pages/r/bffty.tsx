import type { NextPage } from "next";
import Head from "next/head";

const bffty: NextPage = () => {
    return (
        <section style={{textAlign: "center", margin: "2vh auto"}}>
            <Head>
                <title>BFFTY</title>
            </Head>
            <iframe
                width="560"
                height="315"
                src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            />
        </section>
    )
}

export default bffty
