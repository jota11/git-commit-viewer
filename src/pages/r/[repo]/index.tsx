import type { GetStaticPropsContext, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { GlobalCalls } from "@lib/internals";
import { ICommitData } from "types";
import { globalConfigs, global_Repositories, revalidateTime } from "config";
import CommitPreview from "@components/CommitPreview";

type Props = {
    repoCommits: ICommitData[];
}

const RepoIndex: NextPage<Props> = ({ repoCommits }: Props) => {
    const router = useRouter();
    const { repo } = router.query;

    return (
        <section id="main">
            <Head>
                {/* <title>{globalConfigs.name} Commits — {repo}</title> */}
                <title>{globalConfigs.name} Commits</title>
            </Head>
            <h2 id="repository-name">{repo}</h2>
            {Array.isArray(repoCommits) ? repoCommits.map((data: ICommitData) => (
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
