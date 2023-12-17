import { useState } from "react"
import { without } from "lodash"
import DeliveryItemElement from "@/components/delivery-item-element/delivery-item-element"
import DeliveryItemsTotal from "@/components/delivery-items-total/delivery-items-total"
import { DeliveryItem } from "@/models/delivery-item"
import styles from "./delivery-items-selection.module.css"

export default function DeliveryItemsSelection({
    deliveryItems,
    onItemsSelected,
}: {
    deliveryItems: DeliveryItem[]
    onItemsSelected: (items: DeliveryItem[]) => void
}) {
    const [selectedItems, setSelectedItems] = useState<DeliveryItem[]>([])

    const onItemToggle = (deliveryItem: DeliveryItem) => {
        let items
        if (selectedItems.includes(deliveryItem)) {
            items = without(selectedItems, deliveryItem)
        } else {
            items = [...selectedItems, deliveryItem]
        }

        setSelectedItems(items)
        onItemsSelected(items)
    }

    const deliveryItemElements = deliveryItems.map((deliveryItem) => {
        const selected = selectedItems.includes(deliveryItem)

        return (
            <DeliveryItemElement
                deliveryItem={deliveryItem}
                selected={selected}
                clickHandler={() => onItemToggle(deliveryItem)}
                key={deliveryItem.id}
            />
        )
    })

    let total = 0
    selectedItems.forEach((item) => (total += item.price))

    return (
        <div className={styles.deliveryItemsSelection}>
            {deliveryItemElements}

            <DeliveryItemsTotal total={total} />
        </div>
    )
}
