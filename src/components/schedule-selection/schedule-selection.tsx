import { without } from "lodash"
import { useState } from "react"
import styles from "./schedule-selection.module.css"

export default function ScheduleSelection({
    onSelectedDaysUpdated,
}: {
    onSelectedDaysUpdated: (selectedDays: string[]) => void
}) {
    const [selectedDays, setSelectedDays] = useState<string[]>([])

    const daysOfWeek = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"]
    const toggleDay = (day: string) => {
        let updatedDays

        if (selectedDays.includes(day)) {
            updatedDays = without(selectedDays, day)
        } else {
            updatedDays = [...selectedDays, day]
        }

        setSelectedDays(updatedDays)
        onSelectedDaysUpdated(updatedDays)
    }

    const items = daysOfWeek.map((day) => {
        const itemClassNames = `${styles.scheduleSelectionItem} ${
            selectedDays.includes(day)
                ? styles.scheduleSelectionItemSelected
                : ""
        }`

        return (
            <div
                className={itemClassNames}
                key={day}
                onClick={() => toggleDay(day)}
            >
                {day}
            </div>
        )
    })

    return (
        <div className={styles.scheduleSelection}>
            <div className={styles.scheduleSelectionText}>
                Bitte wähle deine gewünschten Liefertage:
            </div>

            {items}
        </div>
    )
}
