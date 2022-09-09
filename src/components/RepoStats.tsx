import { IStatsComponent } from "types";
import styles from "@styles/Stats.module.scss"

const RepoStats: React.FC<IStatsComponent> = ({ repoName, repoTotalCommits, repoTodayCommits }) => {
    return (
        <section className={styles.repositoryStats}>
            <h2>{repoName}</h2>
            <p className={styles.stat}>Total commits: {repoTotalCommits}</p>
            <p className={styles.stat}>Commits made today: {repoTodayCommits}</p>
        </section>
    )
}

export default RepoStats
