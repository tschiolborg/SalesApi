import { useState } from "react"
import { useAuthActions } from 'use-eazy-auth'
import styles from "../styles/Navbar.module.css"


export default function Navbar() {
    const { logout } = useAuthActions()
    const [isNavExpanded, setIsNavExpanded] = useState(false)

    return (
        <nav className={styles.navigation}>
            <a href="/" className={styles.brand_name}>
                BOM - T
            </a>
            <button className={styles.hamburger} onClick={() => {
                setIsNavExpanded(!isNavExpanded)
            }}>
                {/* icon from heroicons.com */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="white"
                >
                    <path
                        fillRule="evenodd"
                        d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>
            <div
                className={
                    isNavExpanded ? styles.navigation_menu + " " + styles.expanded : styles.navigation_menu
                }>
                <ul>
                    <li>
                        <a href="/">Ventes</a>
                    </li>
                    <li>
                        <a href="/summary">Résumé</a>
                    </li>
                    <li>
                        <a href="/end-of-day">Fin de la journée</a>
                    </li>
                    <li>
                        <a href="/login" onClick={logout}>Se déconnecter</a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

