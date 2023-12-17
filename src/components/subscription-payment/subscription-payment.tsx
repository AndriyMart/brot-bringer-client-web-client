import SubscriptionPaymentForm from "@/components/subscription-payment-form/subscription-payment-form"
import {
    CardCvcElement,
    CardElement,
    CardExpiryElement,
    CardNumberElement,
    useElements,
    useStripe,
} from "@stripe/react-stripe-js"
import { StripeCardElement } from "@stripe/stripe-js/types/stripe-js/elements"
import React, { FormEvent } from "react"
import styles from "./subscription-payment.module.css"

export default function SubscriptionPayment() {
    const stripe = useStripe()
    const elements = useElements()

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault()

        if (!stripe) {
            return
        }

        const { paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements?.getElement(CardElement) as StripeCardElement,
        })

        console.log(paymentMethod)
    }

    const CARD_ELEMENT_OPTIONS = {
        style: {
            base: {
                color: "#32325d",
                fontFamily: "'Helvetica Neue', Helvetica, sans-serif",
                fontSmoothing: "antialiased",
                fontSize: "16px",
                "::placeholder": {
                    color: "#aab7c4",
                },
            },
            invalid: {
                color: "#fa755a",
                iconColor: "#fa755a",
            },
        },
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg w-96 mx-auto mt-4">
            <SubscriptionPaymentForm />
            <form onSubmit={handleSubmit} className={styles.stripeForm}>
                <div className={styles.blackStripe} />

                <div className={styles.inputGroup}>
                    <label htmlFor="cardNumber">Kreditkartennummer</label>
                    <CardNumberElement
                        id="cardNumber"
                        options={CARD_ELEMENT_OPTIONS}
                    />
                </div>

                <div className="flex">
                    <div className={styles.inputGroup}>
                        <label htmlFor="cardExpiry">Gültig bis</label>
                        <CardExpiryElement
                            id="cardExpiry"
                            options={CARD_ELEMENT_OPTIONS}
                        />
                    </div>

                    <div className={`pl-4 ${styles.inputGroup}`}>
                        <label htmlFor="cardCVC">CVC</label>
                        <CardCvcElement
                            id="cardCVC"
                            options={CARD_ELEMENT_OPTIONS}
                        />
                    </div>
                </div>
            </form>
        </div>
    )
}
