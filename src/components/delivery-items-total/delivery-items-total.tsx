import styles from "./delivery-items-total.module.css"

export default function DeliveryItemsTotal({ total }: { total: number }) {
    return (
        <div>
            <div className={styles.deliveryItemsTotalPlaceholderContainer}>
                <div className={styles.deliveryItemsTotalPlaceholder}></div>
            </div>

            <div className={styles.deliveryItemsTotal}>Gesamt: €{total}</div>
        </div>
    )
}
