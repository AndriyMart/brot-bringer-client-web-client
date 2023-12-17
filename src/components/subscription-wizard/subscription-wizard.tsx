import React, { useEffect, useState } from "react"
import DeliveryAreaSearch from "@/components/delivery-area-search/delivery-area-search"
import DeliveryItemsSelection from "@/components/delivery-items-selection/delivery-items-selection"
import ScheduleSelection from "@/components/schedule-selection/schedule-selection"
import SubscriptionPayment from "@/components/subscription-payment/subscription-payment"
import SubscriptionWizardFinalView from "@/components/subscription-wizard-final-view/subscription-wizard-final-view"
import SubscriptionWizardFooter from "@/components/subscription-wizard-footer/subscription-wizard-footer"
import { getDeliveryItemsByBakeryId } from "@/components/subscription-wizard/helpers/subscription-wizard-helper"
import { SubscriptionWizardState } from "@/components/subscription-wizard/models/subscription-wizard-state.enum"
import { Bakery } from "@/models/bakery"
import { DeliveryItem } from "@/models/delivery-item"

export default function SubscriptionWizard({ bakery }: { bakery: Bakery }) {
    const [wizardState, setWizardState] = useState<SubscriptionWizardState>(
        SubscriptionWizardState.AddressCheck
    )
    const [deliveryItems, setDeliveryItems] = useState<DeliveryItem[]>([])
    const [selectedDeliveryItems, setSelectedDeliveryItems] = useState<
        DeliveryItem[]
    >([])
    const [selectedDays, setSelectedDays] = useState<string[]>([])

    useEffect(() => {
        getDeliveryItemsByBakeryId(bakery.id).then((items) =>
            setDeliveryItems(items as DeliveryItem[])
        )
    }, [bakery])

    const onNextButtonClick = (): void => {
        switch (wizardState) {
            case SubscriptionWizardState.AddressCheck:
                setWizardState(SubscriptionWizardState.ItemsSelection)
                break
            case SubscriptionWizardState.ItemsSelection:
                setWizardState(SubscriptionWizardState.ScheduleSelection)
                break
            case SubscriptionWizardState.ScheduleSelection:
                setWizardState(SubscriptionWizardState.Payment)
                break
            case SubscriptionWizardState.Payment:
                setWizardState(SubscriptionWizardState.Final)
                break
            default:
                setWizardState(SubscriptionWizardState.AddressCheck)
        }
    }

    const onBackButtonClick = (): void => {
        switch (wizardState) {
            case SubscriptionWizardState.ScheduleSelection:
                setWizardState(SubscriptionWizardState.ItemsSelection)
                break
            case SubscriptionWizardState.Payment:
                setWizardState(SubscriptionWizardState.ScheduleSelection)
                break
            case SubscriptionWizardState.ItemsSelection:
            case SubscriptionWizardState.AddressCheck:
            default:
                setWizardState(SubscriptionWizardState.AddressCheck)
        }
    }

    const viewElement = getViewElementBasedOnState(bakery)

    return (
        <div>
            {viewElement}

            {(wizardState as any) === SubscriptionWizardState.Final ? (
                ""
            ) : (
                <SubscriptionWizardFooter
                    hideBackButton={
                        (wizardState as any) ===
                        SubscriptionWizardState.AddressCheck
                    }
                    hideNexButton={
                        (wizardState as any) === SubscriptionWizardState.Final
                    }
                    customNextButtonName={
                        (wizardState as any) === SubscriptionWizardState.Payment
                            ? "Bezahlen"
                            : undefined
                    }
                    onNextClick={onNextButtonClick}
                    onBackClick={onBackButtonClick}
                    nextButtonDisabled={
                        ((wizardState as any) ===
                            SubscriptionWizardState.ItemsSelection &&
                            !selectedDeliveryItems?.length) ||
                        ((wizardState as any) ===
                            SubscriptionWizardState.ScheduleSelection &&
                            !selectedDays?.length)
                    }
                />
            )}
        </div>
    )

    // region Local functions

    function getViewElementBasedOnState(
        bakery: Bakery
    ): React.ReactElement | null {
        switch (wizardState) {
            case SubscriptionWizardState.AddressCheck:
                return (
                    <DeliveryAreaSearch
                        bakery={bakery}
                        onNextButtonClick={onNextButtonClick}
                    />
                )
            case SubscriptionWizardState.ItemsSelection:
                return (
                    <DeliveryItemsSelection
                        deliveryItems={deliveryItems}
                        onItemsSelected={onItemsSelected}
                    />
                )
            case SubscriptionWizardState.ScheduleSelection:
                return (
                    <ScheduleSelection
                        onSelectedDaysUpdated={onSelectedDaysUpdated}
                    />
                )
            case SubscriptionWizardState.Payment:
                return <SubscriptionPayment />
            case SubscriptionWizardState.Final:
                return <SubscriptionWizardFinalView />
            default:
                return null
        }
    }

    function onItemsSelected(items: DeliveryItem[]): void {
        setSelectedDeliveryItems(items)
    }

    function onSelectedDaysUpdated(days: string[]): void {
        setSelectedDays(days)
    }

    // endregion
}
