import { rj, useRunRj } from 'react-rocketjump'
import { ajax } from 'rxjs/ajax'
import React from "react";
import { useAuthUser } from 'use-eazy-auth'
import styles from "../styles/Modal.module.css"

const TableState = rj({
    effect: () => ajax.getJSON("/api/table/")
})

const ModalUpdateTable= ({ setIsOpen, transactions, setReturnBool }) => {
    const [{ data: tables }] = useRunRj(TableState, [], false)
    const { user } = useAuthUser()
    var selectedTableId = null;

    const updateTable = () => {
        const url = "/api/table/"
        const data = {
            method: "PUT",
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                "table_id": selectedTableId,
                "product_ids": transactions.map(({ product }) => product.id),
                "counts": transactions.map(({ count }) => count),
                "user_id": user.id,
            }),
        }
        fetch(url, data)
        window.location.reload(false)
    }

    const trySelectId = () => {
        
        var selectTable = document.getElementById("tables");
        if (selectTable.length > 0) {
            var selectedValue = selectTable.options[selectTable.selectedIndex].id;
            if (selectedValue !== null || selectedValue !== undefined) {
                selectedTableId = selectedValue;
                return true
            }
        } 
        
        return false 
    }

    return (
        <>
        <div className={styles.darkBG} onClick={() => setIsOpen(false)} />
        <div className={styles.centered}>
            <div className={styles.modal}>
                <div className={styles.modalHeader}>
                    <h5 className={styles.heading}>Choisissez le tableau</h5>
                </div>

                <div className={styles.modalContent}>
                    <select list="tables" name="tables" id="tables">
                        {tables && tables.map((table) => (
                            <option id={table.table_id}>{table.name}</option> 
                        ))}
                    </select>
                </div>
                <div className={styles.modalActions}>
                    <button className={styles.okBtn} onClick={() => {
                        if (trySelectId()) {
                            setIsOpen(false)
                            setReturnBool(true)
                            updateTable()
                        }
                    }}>
                        Ajouter
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


export default ModalUpdateTable;
