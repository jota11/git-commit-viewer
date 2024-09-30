import type { GetStaticPropsContext, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { GlobalCalls } from "@lib/internals";
import { ICommitData } from "types";
import { globalConfigs, global_Repositories, revalidateTime } from "config";
import CommitPreview from "@components/CommitPreview";
import RepoStats from "@components/RepoStats";

type Props = {
    repoCommits: ICommitData[];
}

const RepoIndex: NextPage<Props> = ({ repoCommits }: Props) => {
    const router = useRouter();
    const { repo } = router.query;
    const repositoryName = repo!.toString();

    let commitsTodayNum = 0;
    for (let i = 0; i < repoCommits.length; i++) {
        const dateToday = new Date().toString().slice(0, 15);
        const dateTodayCommits = new Date(repoCommits[i].date).toString().slice(0, 15);
        if (dateToday == dateTodayCommits) commitsTodayNum++;
    }

    const tabTitle = `${globalConfigs.name} Commits — ${repo}`;

    return (
        <section id="main">
            <Head>
                <title>{tabTitle}</title>
            </Head>
            <RepoStats
                repoName={repositoryName}
                repoTotalCommits={repoCommits.length}
                repoTodayCommits={commitsTodayNum}
            />
            {Array.isArray(repoCommits) ? repoCommits.map((data: ICommitData) => (
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

export async function getStaticProps(context: GetStaticPropsContext) {
    const slug = context.params!.repo!.toString();
    const res = await GlobalCalls.getCommitsFromSpecificRepo(slug);
    return {
        props: {
            repoCommits: res
        },
        revalidate: revalidateTime
    }
}

export function getStaticPaths() {
    const paths = global_Repositories.map((repo) => {
        const repoName = repo.url.split("/")[4];
        return {
            params: {
                repo: repoName
            }
        }
    });
    return {
        paths,
        fallback: "blocking"
    }
}

export default RepoIndex
