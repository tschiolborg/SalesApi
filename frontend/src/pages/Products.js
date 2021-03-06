import { useState } from 'react'
import { rj, useRunRj } from 'react-rocketjump'
import { ajax } from 'rxjs/ajax'
import { useAuthUser } from 'use-eazy-auth'
import styles from "../styles/Products.module.css"
import ProductCard from '../components/ProductCard'
import ModalSelect from '../components/ModalSelect'
import ModalConfirm from '../components/ModalConfirm'
import ModalUpdateTable from '../components/ModalUpdateTable'
import Navbar from "../components/Navbar"

const ProductsState = rj({
    effect: (search = '') => ajax.getJSON(`/api/products/?search=${search}`)
})

export default function Products() {
    const { user } = useAuthUser()
    const [search, setSearch] = useState('')
    const [{ data: products }] = useRunRj(ProductsState, [search], false) // trigger api call
    const [isOpen, setIsOpen] = useState(false) // select modal
    const [isOpenC, setIsOpenC] = useState(false) // confirm modal
    const [isOpenT, setIsOpenT] = useState(false) // update table modal
    const [selectedItem, setSelectedItem] = useState({ name: "", price: 0.0, count: 0 })
    const [transactions, setTransactions] = useState([])

    const addNewTransaction = (transaction) => {
        // remove count from product
        products.forEach(product => {
            if (product === transaction.product) {
                product.count -= transaction.count;
            }
        });
        transactions.push(transaction)
    }
    const removeTransaction = (transaction) => {
        // add count back to product
        products.forEach(product => {
            if (product === transaction.product) {
                product.count += transaction.count;
            }
        });

        // remove transaction by copying to new array
        var old_array = [...transactions]
        var new_array = []
        old_array.forEach(t => {
            if (t !== transaction) {
                new_array.push(t)
            }
        });

        setTransactions(new_array)
    }

    const removeAllTransactions = () => {
        // add count back
        transactions.forEach(transaction => {
            products.forEach(product => {
                if (product === transaction.product) {
                    product.count += transaction.count;
                }
            });
        });
        // reset
        setTransactions([])
    }

    // if true then remove all transactions
    const returnRemoveTransactions = (bool) => {
        if (bool) {
            removeAllTransactions()
        }
    }

    const tryOpenConfirmModal = () => {
        if (transactions.length > 0) {
            setIsOpenC(true)
        }
    }

    const tryOpenUpdateTableModal = () => {
        if (transactions.length > 0) {
            setIsOpenT(true)
        }
    }

    return (
        <div>
            <Navbar />
            <div className="row mt-2 p-2">
                <div className={styles.columnLeft}>
                    <div className='col-md-10 offset-md-1'>
                        <div className="mt-2">
                            <input
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                placeholder="Rechercher un produit"
                                style={{ fontSize: 22 }}
                                className="form-control"
                            />
                        </div>
                        <div className='list-item mt-4'>
                            {products &&
                                products.map((product) => (
                                    <div key={product.id} onClick={() => {
                                        setIsOpen(true);
                                        setSelectedItem(product);
                                    }}>
                                        <ProductCard key={product.id} product={product} />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className={styles.columnRight}>
                    <div className={styles.colList}>
                        <p>Connect?? en tant que <i>{user.username}</i></p>
                        <h5>Commande en cours</h5>
                        <div>
                            <div>
                                Prix total:
                            </div>
                            <b>
                                {transactions &&
                                    transactions.reduce(
                                        (total, currentValue) =>
                                            total = total
                                            + parseFloat(currentValue.product.price)
                                            * parseFloat(currentValue.count),
                                        0).toFixed(2)
                                }
                                <> Fc</>
                            </b>
                            <div>
                                <button className={styles.confirmBtn} onClick={() => {
                                    tryOpenConfirmModal()
                                }}>
                                    Confirmer
                                </button>
                                <button className={styles.middleBtn} onClick={() => {
                                    tryOpenUpdateTableModal()
                                }}>
                                    ?? la table
                                </button>
                                <> </>
                                <button className={styles.removeBtn} onClick={removeAllTransactions}>
                                    Enlever tout
                                </button>
                            </div>
                        </div>
                        <div className='list-item mt-4'>
                            {transactions &&
                                transactions.map((transaction) => (
                                    <div className="list-group-item">
                                        <div className={styles.myFontSize}>
                                            <div>
                                                <b>{(transaction.count * transaction.product.price).toFixed(2)} Fc </b>
                                            </div>
                                            <b>{transaction.count} x </b>
                                            <b>{transaction.product.name} </b>
                                            <div>
                                                <button className={styles.removeBtn}
                                                    onClick={() => { removeTransaction(transaction) }}>
                                                    ??liminer
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
                {
                    isOpen && selectedItem &&
                    <ModalSelect
                        setIsOpen={setIsOpen}
                        product={selectedItem}
                        setReturnTransaction={addNewTransaction}
                    />
                }
                {
                    isOpenC && transactions.length > 0 &&
                    <ModalConfirm
                        setIsOpen={setIsOpenC}
                        transactions={transactions}
                        setReturnBool={returnRemoveTransactions}
                    />
                }
                {
                    isOpenT && transactions.length > 0 &&
                    <ModalUpdateTable
                        setIsOpen={setIsOpenT}
                        transactions={transactions}
                        setReturnBool={returnRemoveTransactions}
                    />
                }
            </div >
        </div>
    )
}


