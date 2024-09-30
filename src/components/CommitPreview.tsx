import Link from "next/link";
import Image from "next/image";
import Markdown from "markdown-to-jsx";
import styles from "@styles/CommitItem.module.scss";
import { ICommitDataComponent } from "types";
import { commitConfigs } from "config";
import { GlobalCalls } from "@lib/internals";

const CommitPreview: React.FC<ICommitDataComponent> = ({ sha, author, date, repositoryName, repositoryLink, branch, message }) => {
    let dateConverted = new Date(date).toString();
    let messageBlur = false;
    let hideCommitEntirely = false;
    if (commitConfigs.showObfuscatedCommits && sha == commitConfigs.hiddenCommit_sha) {
        messageBlur = true;
    }
    else if (!commitConfigs.showObfuscatedCommits && sha == commitConfigs.hiddenCommit_sha) {
        hideCommitEntirely = true;
    }
    const shouldApplyBlur = messageBlur ? " blur" : "";

    const botCheck = () => {
        if (GlobalCalls.isUserBot(author.accountType)) {
            return (
                <i className="mdi mdi-robot" title={commitConfigs.msg_botMadeCommit}></i>
            )
        } else {
            return;
        }
    }

    if (!hideCommitEntirely) {
        return (
            <div className={styles.commit + shouldApplyBlur}>
                <section className={styles.authorInfo}>
                    <Image src={author.avatar} width={80} height={80} priority={true} alt={author.handle + "'s avatar"} />
                    <span className={styles.handle}>{author.handle} {botCheck()}</span>
                    <time className={styles.date} dateTime={date} title={dateConverted.slice(0, 33)}>{dateConverted.slice(4, 15)}</time>
                </section>
                <section className={styles.commitInfo}>
                    <p className={styles.repoBranchSha}>
                        <Link href={repositoryLink}>
                            {repositoryName}
                        </Link>
                        /{branch}
                        <span className={styles.sha}>
                            <Link href={"/r/" + repositoryName + "/" + sha}>
                                #{sha.slice(0, commitConfigs.commitShaSize)}
                            </Link>
                        </span>
                    </p>
                    <Markdown options={{
                        forceBlock: true,
                        forceWrapper: true,
                        wrapper: "span"
                    }}>
                        {message}
                    </Markdown>
                </section>
            </div>
        )
    } else {
        return null;
    }
}

export default CommitPreview
