import { GetStaticPropsContext, NextPage } from "next";
import Head from "next/head";
import { ICommitData, IConfigRepo } from "types";
import { GlobalCalls } from "@lib/internals";
import CommitFull from "@components/CommitFull";
import { globalConfigs, global_Repositories, revalidateTime } from "config";

type Props = {
    commit: ICommitData;
}

const RepoCommit: NextPage<Props> = ({ commit }: Props) => {
    if (commit != null) {
        return (
            <section id="main">
                <Head>
                    {/* <title>{globalConfigs.name} Commits — {commit.repository_name} — #{commit.sha.slice(0, 7)}</title> */}
                    <title>{globalConfigs.name} Commits</title>
                </Head>
                <CommitFull
                    sha={commit.sha}
                    author={{
                        avatar: commit.author.avatar,
                        name: commit.author.name,
                        handle: commit.author.handle,
                    }}
                    date={commit.date}
                    repositoryName={commit.repository_name}
                    repositoryLink={"/r/" + commit.repository_name}
                    branch={"[BRANCH]"}
                    message={commit.message}
                />
            </section>
        )
    } else {
        return (
            <section id="main">
                <Head>
                    <title>testing</title>
                </Head>
            </section>
        )
    }
}

export async function getStaticProps(context: GetStaticPropsContext) {
    const repoSlugStringified = context.params!.repo!.toString();
    const shaSlugStringified = context.params!.sha!.toString();
    const res = await GlobalCalls.getCommit(repoSlugStringified, shaSlugStringified);
    return {
        props: {
            commit: res ?? null
        },
        revalidate: revalidateTime
    }
}

export async function getStaticPaths() {
    const commits = await GlobalCalls.getCommits();
    const paths = global_Repositories.map((repo: IConfigRepo) =>
        commits.map((commits: any) => ({
            params: {
                repo: repo.url.split("/")[4],
                sha: commits.sha.toString(),
            }
        }
    ))).flat();
    // console.log(paths);
    return {
        paths,
        fallback: "blocking"
    }
}

export default RepoCommit;
