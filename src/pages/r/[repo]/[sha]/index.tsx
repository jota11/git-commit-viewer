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
        const tabTitle = `${globalConfigs.name} Commits — ${commit.repository_name} — #${commit.sha.slice(0, 7)}`
        return (
            <section id="main">
                <Head>
                    <title>{tabTitle}</title>
                </Head>
                <CommitFull
                    sha={commit.sha}
                    author={{
                        avatar: commit.author.avatar,
                        name: commit.author.name,
                        handle: commit.author.handle,
                        accountType: commit.author.accountType,
                    }}
                    date={commit.date}
                    repositoryName={commit.repository_name}
                    repositoryLink={"/r/" + commit.repository_name}
                    branch={commit.branch_name}
                    message={commit.message}
                />
            </section>
        )
    } else {
        return (
            <section id="main">
                <Head>
                    <title>Commit not found</title>
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
