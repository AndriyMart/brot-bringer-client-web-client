import { DeliveryItem } from "@/models/delivery-item"
import { getApp } from "@firebase/app"
import {
    getFirestore,
    collection,
    query,
    where,
    getDocs,
} from "firebase/firestore"

export async function getDeliveryItemsByBakeryId(
    bakeryId: string
): Promise<DeliveryItem[] | null> {
    const firebaseApp = getApp()
    const db = getFirestore(firebaseApp)

    const deliveryItemsCollection = collection(db, "deliveryItems")
    const q = query(deliveryItemsCollection, where("bakeryId", "==", bakeryId))

    const querySnapshot = await getDocs(q)
    const deliveryItems: DeliveryItem[] = []

    querySnapshot.forEach((doc) => {
        const data = doc.data() as DeliveryItem
        deliveryItems.push(data)
    })

    return deliveryItems.length > 0 ? deliveryItems : null
}
