import { Bakery } from "@/models/bakery"
import styles from "./bakery-general-info.module.css"

export default function BakeryGeneralInfo({ bakery }: { bakery: Bakery }) {
    return (
        <div className={styles.bakeryGeneralInfo}>
            <div
                className={styles.bakeryGeneralInfoCoverImage}
                style={{
                    backgroundImage: `url(${bakery.coverImageUrl})`,
                }}
            />

            <div className={styles.bakeryGeneralInfoContent}>
                <img
                    className={styles.bakeryGeneralInfoLogo}
                    src={bakery.logoId}
                    alt="Logo"
                />

                <div className={styles.bakeryGeneralInfoName}>
                    {bakery.name}
                </div>
                {bakery.description}
            </div>
        </div>
    )
}
