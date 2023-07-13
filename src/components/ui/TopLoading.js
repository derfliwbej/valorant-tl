import styles from "@/styles/ui/TopLoading.module.css";

export default function TopLoading() {
    return (
        <div className={styles['loader-wrapper']}>
            <div className={styles['loader-1']}><span></span></div>
        </div>
        
    );
}