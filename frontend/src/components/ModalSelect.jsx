import React from "react";
import { useState } from 'react'
import styles from "./Modal.module.css"

class Transaction {
    // transaction of one product
    constructor(product, count) {
        this.product = product;
        this.count = count;
    }
}

const ModalSelect = ({ setIsOpen, product, setReturnTransaction }) => {
    const [count, setCount] = useState(0)

    const evalCount = (val) => {
        var parsed = parseInt(val)
        if (!isNaN(parsed) && val >= 0 && val <= product.count) {
            setCount(parsed)
            document.getElementById("countID").value = parsed
        } else {
            setCount(0)
            document.getElementById("countID").value = 0
        }
    }

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
                    <br></br>
                    <>Sell amount: </>
                    <input 
                        className={styles.modal_input}
                        type="number" 
                        id="countID"
                        min="0" 
                        max={product.count}
                        step="1"
                        onChange={ e => {
                            evalCount(e.target.value)
                        }}
                    />
                </div>
                <div className={styles.modalActions}>
                    <button className={styles.okBtn} onClick={() => {
                        setIsOpen(false);
                        if (count > 0) {
                            setReturnTransaction(new Transaction(product, count));
                        }
                    }}>
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


export default ModalSelect;
