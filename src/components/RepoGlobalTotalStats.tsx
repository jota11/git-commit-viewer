import { ITotalStatsComponent } from "types";
import styles from "@styles/Stats.module.scss"

const RepoGlobalTotalStats: React.FC<ITotalStatsComponent> = ({ totalStatsCommits, totalStatsTodayCommits }) => {
    return (
        <section className={styles.repositoryStats}>
            <p className={styles.stat}>Total commits: {totalStatsCommits}</p>
            <p className={styles.stat}>Total commits made today: {totalStatsTodayCommits}</p>
        </section>
    )
}

export default RepoGlobalTotalStats
