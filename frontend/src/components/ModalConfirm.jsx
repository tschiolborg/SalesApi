import React from "react";
import { useState } from 'react'
import { useAuthUser } from 'use-eazy-auth'
import styles from "../styles/Modal.module.css"


const ModalConfirm = ({ setIsOpen, transactions, setReturnBool }) => {
    const { user } = useAuthUser()

    // total price of transactions
    const total_price = transactions.reduce(
        (total, currentValue) =>
            total = total
            + parseFloat(currentValue.product.price)
            * parseFloat(currentValue.count),
        0).toFixed(2)

    // value we pay
    const [payAmount, setPayAmount] = useState(total_price)
    // amount to give back
    const [giveBack, setGiveBack] = useState(0)
    // if not payed full amount
    const [halfPay, setHalfPay] = useState(0)

    const evalPayAmount = (val) => {
        if (val >= 0) {
            setPayAmount(val)
        } else {
            setPayAmount(0)
            document.getElementById("payAmountID").value = 0
        }
        if (val === "") {
            setGiveBack(0)
            setHalfPay(0)
            setPayAmount(total_price)
        } else {
            setGiveBack(Math.max(0, val - total_price).toFixed(2))
            setHalfPay(Math.max(0, total_price - val).toFixed(2))           
        }
    }

    const sendTransaction = () => {
        const url = "/api/transactions/"
        const data = {
            method: "POST",
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                "name": "Vente",
                "total_price": total_price,
                "amount_payed": payAmount,
                "product_ids": transactions.map(({ product }) => product.id),
                "counts": transactions.map(({ count }) => count),
                "user_id": user.id,
            }),
        }
        fetch(url, data)
        window.location.reload(false)
    }

    return (
        <>
        <div className={styles.darkBG} onClick={() => setIsOpen(false)} />
        <div className={styles.centered}>
            <div className={styles.modal}>
                <div className={styles.modalHeader}>
                    <h5 className={styles.heading}>Confirmer la commande</h5>
                </div>

                <div className={styles.modalContent}>
                    Prix total: <b>{total_price} </b> Fc
                    <br></br>
                    Payé: <> </>
                    <input 
                        className={styles.modal_input}
                        type="number" 
                        id="payAmountID"
                        min="0"
                        max="10000.00"
                        placeholder={total_price}
                        onChange={ e => {
                            evalPayAmount(e.target.value)
                        }}
                    />
                    <> </>Fc
                    <br></br>
                    Redonner: <b>{giveBack}</b> Fc
                    <br></br>
                    Reste à payer: <b>{halfPay}</b> Fc
                </div>
                <div className={styles.modalActions}>
                    <button className={styles.okBtn} onClick={() => {
                        setIsOpen(false);
                        setReturnBool(true)
                        sendTransaction()
                    }}>
                        {halfPay == 0 ? "Tout payer" : "Payer une partie"}
                    </button>
                    <button className={styles.cancelBtn} onClick={() => setIsOpen(false)}>
                        Annuler
                    </button>
                </div>
            </div>
        </div>
        </>
    )
};


export default ModalConfirm;
