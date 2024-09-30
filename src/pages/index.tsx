import type { NextPage } from "next";
import Head from "next/head";
import { GlobalCalls } from "@lib/internals";
import { ICommitData } from "types";
import { globalConfigs, revalidateTime } from "config";
import CommitPreview from "@components/CommitPreview";
import RepoGlobalTotalStats from "@components/RepoGlobalTotalStats";

type Props = {
    commits: ICommitData[];
}

const Home: NextPage<Props> = ({ commits }: Props) => {

    let commitsTodayNum = 0;
    for (let i = 0; i < commits.length; i++) {
        const dateToday = new Date().toString().slice(0, 15);
        const dateTodayCommits = new Date(commits[i].date).toString().slice(0, 15);
        if (dateToday == dateTodayCommits) commitsTodayNum++;
    }

    const tabTitle = `${globalConfigs.name} Commits`;

    return (
        <section id="main">
            <Head>
                <title>{tabTitle}</title>
            </Head>
            <RepoGlobalTotalStats
                totalStatsCommits={commits.length}
                totalStatsTodayCommits={commitsTodayNum}
            />
            {Array.isArray(commits) ? commits.map((data: ICommitData) => (
                <CommitPreview
                    key={data.sha}
                    sha={data.sha}
                    author={{
                        avatar: data.author.avatar,
                        name: data.author.name,
                        handle: data.author.handle,
                        accountType: data.author.accountType
                    }}
                    date={data.date}
                    repositoryName={data.repository_name}
                    repositoryLink={"/r/" + data.repository_name}
                    branch={data.branch_name}
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
        },
        revalidate: revalidateTime
    }
}

export default Home
