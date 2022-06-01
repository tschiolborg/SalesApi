import { useState } from 'react'
import React from "react";
import styles from "../styles/Modal.module.css"


const ModalTable = ({ setIsOpen, table, transaction }) => {

    // value we pay
    const [payAmount, setPayAmount] = useState(transaction.total_price)
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
            setPayAmount(transaction.total_price)
        } else {
            setGiveBack(Math.max(0, val - transaction.total_price).toFixed(2))
            setHalfPay(Math.max(0, transaction.total_price - val).toFixed(2))           
        }
    }


    const rename = (name) => {
        if (name == "") {
            return
        }
        const url = "/api/table/"
        const data = {
            method: "PUT",
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                "table_id": table.id,
                "rename": name
            }),
        }
        fetch(url, data)
        window.location.reload(false)
    }

    const delete_table = () => {
        const url = "/api/table/"
        const data = {
            method: "DELETE",
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                "table_id": table.id,
            }),
        }
        fetch(url, data)
        window.location.reload(false)
    }

    const pay = () => {
        const url = "/api/table/"
        const data = {
            method: "PUT",
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                "table_id": table.id,
                "pay": payAmount
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
                    <h5 className={styles.heading}>{table.name}</h5>
                </div>
                <div className={styles.modalContent}>
                    <input type="text" id="input" />
                    <button className={styles.middleBtn} onClick={() => {
                            if (rename(document.getElementById("input").value)) {
                                setIsOpen(false);
                            }
                        }}>
                        Renommer
                    </button>
                    <br />
                    <button className={styles.deleteBtn} onClick={() => {
                        delete_table()
                        setIsOpen(false)
                    }}>
                        Effacer
                    </button>
                    <br />
                    <br />
                    <div className='list-item mt-2'>
                        {transaction && transaction.products.map((pair) => (
                            <div className="mt-2">
                                {pair.count} x {pair.name}
                            </div>
                        ))}
                    </div>
                    <br />
                    Prix total: <b>{transaction.total_price}</b> Fc
                    <br />
                    Payé: <> </>
                    <input 
                        className={styles.modal_input}
                        type="number" 
                        id="payAmountID"
                        min="0"
                        max="10000.00"
                        placeholder={transaction.total_price}
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
                        pay()
                        delete_table()
                        setIsOpen(false)
                    }}>
                        {halfPay == 0 ? "Tout payer" : "Payer partie"}
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


export default ModalTable;
