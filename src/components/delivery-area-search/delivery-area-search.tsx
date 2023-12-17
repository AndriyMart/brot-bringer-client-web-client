import { Circle, GoogleMap, LoadScript, MarkerF } from "@react-google-maps/api"
import { useState } from "react"
import BakeryGeneralInfo from "@/components/bakery-general-info/bakery-general-info"
import DeliveryAreaSearchInput from "@/components/delivery-area-search-input/delivery-area-search-input"
import { DeliveryAreaSearchProps } from "@/components/delivery-area-search/models/delivery-area-search-props.model"
import styles from "./delivery-area-search.module.css"

const containerStyle = {
    width: "100%",
    height: "400px",
};

const areaOptions = {
    strokeColor: "#F6B509",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#F6B509",
    fillOpacity: 0.35,
};

export default function DeliveryAreaSearch(props: DeliveryAreaSearchProps) {
    const [showWarningOnNextButton, setShowWarningOnNextButton] =
        useState(false)

    const googleMapsPublicKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    const [lat, lng] = props.bakery.coordinates
    const center = { lat, lng }

    const onDeliveryAreaSearchResultChange = (found: boolean): void => {
        setShowWarningOnNextButton(!found)
    }

    return (
        <div className={styles.deliveryAreaSearch}>
            <BakeryGeneralInfo bakery={props.bakery} />

            <div className={styles.deliveryAreaSearchContent}>
                <div className={styles.deliveryAreaAvailabilityText}>
                    Bitte überprüfe ob deine Adresse innerhalb des
                    Liefergebietes liegt
                </div>

                <LoadScript
                    googleMapsApiKey={googleMapsPublicKey as any}
                    libraries={["places"]}
                >
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={center}
                        zoom={13}
                    >
                        <Circle
                            center={center}
                            radius={2000}
                            options={areaOptions}
                        />

                        <MarkerF
                            position={center}
                            icon={{
                                url: props.bakery.logoId,
                                scaledSize: {
                                    height: 40,
                                    width: 40,
                                } as any,
                            }}
                        />
                    </GoogleMap>
                </LoadScript>

                <div className={styles.deliveryAreaAvailabilityAlternativeText}>
                    Oder benutze die Suchfunktion um deine Adresse zu überprüfen
                </div>

                <div className={styles.deliveryAreaAvailabilitySearchContainer}>
                    <DeliveryAreaSearchInput
                        bakery={props.bakery}
                        onResultChange={onDeliveryAreaSearchResultChange}
                    />
                </div>
            </div>
        </div>
    )
}
