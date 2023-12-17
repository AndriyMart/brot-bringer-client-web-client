import React from "react"
import styles from "./header.module.css"

export default function Header() {
    return (
        <header>
            <div className={styles.headerPlaceholder}></div>

            <div className={styles.header}>
                <div className="flex items-center space-x-2">
                    <img
                        src="/logo.svg"
                        alt="BrotBringer"
                        className="h-14 w-auto"
                    />
                </div>
                <button className={styles.headerLoginButton}>Login</button>
            </div>
        </header>
    )
}
