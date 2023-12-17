import { Bakery } from "@/models/bakery"
import { Autocomplete, LoadScript } from "@react-google-maps/api"
import { useState } from "react"
import styles from "./delivery-area-search-input.module.css"

export default function DeliveryAreaSearchInput({
    bakery,
    onResultChange,
}: {
    bakery: Bakery
    onResultChange: (found: boolean) => void
}) {
    const googleMapsPublicKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    const [autocomplete, setAutocomplete] = useState<any>(null)
    const [google, setGoogle] = useState<any>(null)
    const [result, setResult] = useState<boolean | null>(null)

    const onLoad = (item: any) => {
        setAutocomplete(item)
        setGoogle((window as any).google)
    }

    const onPlaceChanged = () => {
        if (autocomplete && google) {
            handlePlaceChanged()
        } else {
            console.log("Autocomplete or Google Maps is not loaded yet!")
        }
    }

    const handlePlaceChanged = () => {
        if (!autocomplete) {
            return
        }

        const bakeryLocation = new google.maps.LatLng(
            bakery.coordinates[0],
            bakery.coordinates[1]
        )
        const userLocation = new google.maps.LatLng(
            autocomplete.getPlace().geometry.location.lat(),
            autocomplete.getPlace().geometry.location.lng()
        )
        const distanceInMeters =
            google.maps.geometry.spherical.computeDistanceBetween(
                bakeryLocation,
                userLocation
            )

        if (distanceInMeters < 2000) {
            setResult(true) //"
            onResultChange(true)
        } else {
            setResult(false) // ""
            onResultChange(false)
        }
    }
    const libraries = ["places"] as any
    let resultElement

    if (result !== null) {
        resultElement = result ? (
            <span className={styles.deliveryAreaSearchPositiveResult}>
                👍 Yey! Deine Adresse befindet sich in unserem Liefergebiet
            </span>
        ) : (
            <span className={styles.deliveryAreaSearchInputNegativeResult}>
                Schade! Leider biete diese Bäckerei noch keine Lieferung an
                deiner Adresse an
            </span>
        )
    }

    return (
        <div className={styles.deliveryAreaSearchInput}>
            <LoadScript
                libraries={libraries}
                googleMapsApiKey={googleMapsPublicKey as any}
            >
                <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                    <div className="flex flex-col items-center justify-center">
                        <input
                            type="text"
                            className="p-2 border border-gray-300 focus:border-F6B509 focus:outline-none rounded-md w-full"
                            placeholder="Gibt hier deine Adresse ein"
                        />

                        {resultElement}
                    </div>
                </Autocomplete>
            </LoadScript>
        </div>
    )
}
