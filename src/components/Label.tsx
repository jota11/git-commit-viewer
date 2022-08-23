import { ILabel } from "types";
import styles from "@styles/Label.module.scss";

const Label: React.FC<ILabel> = ({ warningLevel, iconName, message, closable }) => {
    if (!iconName) {
        iconName = warningLevel
    }

    if (warningLevel == "warning") {
        return (
            <div className={styles.label + " " + styles.warning}>
                <section className={styles.icon}>
                    <i className={`${"mdi mdi-" + iconName}`}></i>
                </section>
                <section className={styles.info}>
                    <p>{message}</p>
                </section>
            </div>
        )
    }
    else if (warningLevel == "error") {
        return (
            <div className={styles.label + " " + styles.error}>
                <section className={styles.icon}>
                    <i className={`${"mdi mdi-" + iconName}`}></i>
                </section>
                <section className={styles.info}>
                    <p>{message}</p>
                </section>
            </div>
        )
    } else {
        return (
            <div className={styles.label}>
                <section className={styles.icon}>
                    <i className={`${"mdi mdi-" + iconName}`}></i>
                </section>
                <section className={styles.info}>
                    <p>{message}</p>
                </section>
            </div>
        )
    }
}

export default Label
