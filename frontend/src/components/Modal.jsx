import React from "react";
import styles from "./Modal.module.css"

const Modal = ({ setIsOpen, product }) => {
    return (
        <>
        <div className={styles.darkBG} onClick={() => setIsOpen(false)} />
        <div className={styles.centered}>
            <div className={styles.modal}>
                <div className={styles.modalHeader}>
                    <h5 className={styles.heading}>Dialog</h5>
                </div>
                <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
                    X
                </button>
                <div className={styles.modalContent}>
                    <h5>{product.name}</h5>
                </div>
                <div className={styles.modalActions}>
                    <button className={styles.deleteBtn} onClick={() => setIsOpen(false)}>
                        Delete
                    </button>
                    <button className={styles.cancelBtn} onClick={() => setIsOpen(false)}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
        </>
    )
};


export default Modal;
