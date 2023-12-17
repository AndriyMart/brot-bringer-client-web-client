import { DeliveryItem } from "@/models/delivery-item"
import styles from "./delivery-item-element.module.css"

export default function DeliveryItemElement({
    deliveryItem,
    clickHandler,
    selected,
}: {
    deliveryItem: DeliveryItem
    clickHandler: () => void
    selected: boolean
}) {
    const selectedClass = selected ? styles.deliveryItemSelected : ""

    return (
        <div
            className={`${styles.deliveryItem} ${selectedClass}`}
            onClick={clickHandler}
        >
            <div
                className={styles.deliveryItemImage}
                style={{
                    backgroundImage: `url(${deliveryItem.imageUrl})`,
                }}
            ></div>

            <div className={styles.deliveryItemText}>
                <div className={styles.deliveryItemName}>
                    {deliveryItem.name}
                </div>

                <div className={styles.deliveryItemDescription}>
                    {deliveryItem.description}
                </div>
            </div>

            <div className={styles.deliveryItemPrice}>
                €{deliveryItem.price}
            </div>
        </div>
    )
}
