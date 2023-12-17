import React from "react"
import Layout from "@/components/layout"
import initFirebase from "@/utils/firebase"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import "../globals.css"

export default function MyApp({
    Component,
    pageProps,
}: {
    Component: any
    pageProps: any[]
}) {
    initFirebase()

    const stripePublicKey =
        "pk_test_51NjI79L8DMEZIOKQ8l5V10AaXYX7KE6tiQozq1d49rwkPE2wmpHc76n4bNHLwUCiTaESR5o8rC5sNiFZ1grhVaYN00PlCsoN7B"
    const stripePromise = loadStripe(stripePublicKey)

    return (
        <Layout>
            <Elements stripe={stripePromise}>
                <Component {...pageProps} />
            </Elements>
        </Layout>
    )
}
