import React from "react"
import styles from "./subscription-wizard-footer.module.css"

export default function SubscriptionWizardFooter({
    nextButtonDisabled,
    customNextButtonName,
    hideBackButton,
    hideNexButton,
    onNextClick,
    onBackClick,
}: {
    warn?: boolean
    nextButtonDisabled?: boolean
    customNextButtonName?: string
    hideBackButton: boolean
    hideNexButton: boolean
    onNextClick: () => void
    onBackClick: () => void
}) {
    const backButton = hideBackButton ? (
        ""
    ) : (
        <button
            className={styles.subscriptionWizardFooterBackButton}
            onClick={onBackClick}
        >
            Zurück
        </button>
    )

    const nextButtonClassNames = `${
        styles.subscriptionWizardFooterNextButton
    } ${
        nextButtonDisabled
            ? styles.subscriptionWizardFooterNextButtonDisabled
            : ""
    }`

    const nextButton = hideNexButton ? (
        ""
    ) : (
        <button className={nextButtonClassNames} onClick={onNextClick}>
            {customNextButtonName || "Weiter"}
        </button>
    )

    return (
        <div className={styles.subscriptionWizardFooterContainer}>
            <div className={styles.subscriptionWizardFooterPlaceholder} />

            <div className={styles.subscriptionWizardFooter}>
                <div className={styles.subscriptionWizardButtonContainer}>
                    {backButton}
                </div>

                <div className={styles.subscriptionWizardButtonContainer}>
                    {nextButton}
                </div>
            </div>
        </div>
    )
}
