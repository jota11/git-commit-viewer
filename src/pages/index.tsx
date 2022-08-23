import type { NextPage } from "next";
import Head from "next/head";
import { GlobalCalls } from "@lib/internals";
import { ICommitData } from "types";
import { globalConfigs, revalidateTime } from "config";
import CommitPreview from "@components/CommitPreview";

type Props = {
    commits: ICommitData[];
}

const Home: NextPage<Props> = ({ commits }: Props) => {
    return (
        <section id="main">
            <Head>
                <title>{globalConfigs.name} Commits</title>
            </Head>
            {Array.isArray(commits) ? commits.map((data: ICommitData) => (
                <CommitPreview
                    key={data.sha}
                    sha={data.sha}
                    author={{
                        avatar: data.author.avatar,
                        name: data.author.name,
                        handle: data.author.handle,
                    }}
                    date={data.date}
                    repositoryName={data.repository_name}
                    repositoryLink={"/r/" + data.repository_name}
                    branch={"[BRANCH]"}
                    message={data.message}
                />
            )) : <h1>Not an array!</h1>}
        </section>
    )
}

export async function getStaticProps() {
    const res = await GlobalCalls.getCommits();
    return {
        props: {
            commits: res
        }
        // revalidate: revalidateTime
    }
}

export default Home
