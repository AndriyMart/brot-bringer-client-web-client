import Loader from "@/components/loader/loader"
import SubscriptionWizard from "@/components/subscription-wizard/subscription-wizard"
import React, { useState, useEffect } from "react"
import { Bakery } from "@/models/bakery"
import { getApp } from "@firebase/app"
import { doc, getDoc, getFirestore } from "firebase/firestore"
import { useRouter } from "next/router"

async function getBakeryById(id: string): Promise<Bakery | null> {
    const firebaseApp = getApp()
    const db = getFirestore(firebaseApp)

    const bakeryRef = doc(db, "bakeries", id)
    const bakeryDoc = await getDoc(bakeryRef)

    if (bakeryDoc.exists()) {
        return bakeryDoc.data() as Bakery
    } else {
        return null
    }
}

export default function BakeryPage() {
    const router = useRouter()
    const { id } = router.query
    const [bakery, setBakery] = useState<Bakery | null>(null)

    useEffect(() => {
        if (id) {
            getBakeryById(id as string).then((bakeryData) => {
                setBakery(bakeryData)
            })
        }
    }, [id])

    if (!bakery) {
        return <Loader />
    }

    const mapView = (
        <div>
            <SubscriptionWizard bakery={bakery} />
        </div>
    )

    return bakery ? mapView : <Loader />
}
