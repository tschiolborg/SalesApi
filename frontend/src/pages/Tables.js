import { useState } from 'react'
import { rj, useRunRj } from 'react-rocketjump'
import { ajax } from 'rxjs/ajax'
import { useAuthUser } from 'use-eazy-auth'
import styles from "../styles/ProductCard.module.css"
import Navbar from '../components/Navbar'
import ModalTable from "../components/ModalTable"

const TransactionState = rj({
    effect: () => ajax.getJSON("/api/transactions/")
})
const TableState = rj({
    effect: () => ajax.getJSON("/api/table/")
})

export default function Tables() {
    const { user } = useAuthUser()
    const [{ data: transactions }] = useRunRj(TransactionState, [], false)
    const [{ data: tables }] = useRunRj(TableState, [], false)
    const [isOpen, setIsOpen] = useState(false) // modal
    const [selectedTable, setSelectedTable] = useState({ id: "", name: "" })
    const [selectedTransaction, setSelectedTransaction] = useState({ total_price: 0, amount_payed: 0, product_names: [], counts: [] })

    const newTable = () => {
        const url = "/api/table/"
        const data = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "user_id": user.id,
            }),
        }
        fetch(url, data)
        window.location.reload(false)
    }

    const onClickTable = (table_id, table_name, transaction_id) => {
        setSelectedTable({ id: table_id, name: table_name })

        var my_transaction = null
        transactions.forEach(transaction => {
            if (transaction.id == transaction_id) {
                my_transaction = transaction
            }
        });

        setSelectedTransaction({
            total_price: my_transaction.total_price,
            amount_payed: my_transaction.amount_payed,
            products: my_transaction.products
        })

        setIsOpen(true)
    }

    return (
        <div>
            <Navbar />

            <div className='row mt-2 p-2'>
                <div className='col-md-6 p-4'>
                    <div>
                        <h3>Les tables</h3>
                    </div>
                    <div className='mt-4'>
                        <button className="basicBtn" onClick={newTable}>Nouveau tableau</button>
                    </div>
                    <div className="row mt-2 p-2">
                        <div className='list-item mt-2'>
                            {tables &&
                                tables.map((table) => (
                                    <div className={styles.div} onClick={() => (
                                        onClickTable(table.table_id, table.name, table.transaction_id)
                                    )}>
                                        <div className={styles.list_group_item}>
                                            {table.name}
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
                {
                    isOpen &&
                    <ModalTable
                        setIsOpen={setIsOpen}
                        table={selectedTable}
                        transaction={selectedTransaction}
                    />
                }
            </div>
        </div >

    )
}


