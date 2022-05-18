import React from "react";
import styles from "./Modal.module.css"

const Modal = ({ setIsOpen, product, setReturnTransaction }) => {
    return (
        <>
        <div className={styles.darkBG} onClick={() => setIsOpen(false)} />
        <div className={styles.centered}>
            <div className={styles.modal}>
                <div className={styles.modalHeader}>
                    <h5 className={styles.heading}>{product.name}</h5>
                </div>
                <div className={styles.modalContent}>
                    Price: {product.price} kr.
                    <br></br>
                    Avaliable: {product.count}
                </div>
                <div className={styles.modalActions}>
                    <button className={styles.okBtn} onClick={() => setIsOpen(false)}>
                        OK
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
