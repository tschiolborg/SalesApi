import { useState } from 'react'
import { rj, useRunRj } from 'react-rocketjump'
import { ajax } from 'rxjs/ajax'
import { useAuthActions, useAuthUser } from 'use-eazy-auth'
import styles from "./Products.module.css"
import ProductCard from '../components/ProductCard'
import Modal from '../components/Modal'

const ProductsState = rj({
    effect: (search = '') => ajax.getJSON(`/products/?search=${search}`)
})

class Transaction {
    // transaction of one product
    constructor(product, count) {
        this.product = product;
        this.count = count;
    }
}

export default function Products() {
    const { user } = useAuthUser()
    const { logout } = useAuthActions()
    const [search, setSearch] = useState('')
    const [{ data: products }] = useRunRj(ProductsState, [search], false) // trigger api call
    const [isOpen, setIsOpen] = useState(false)
    const [selectedItem, setSelectedItem] = useState({ name: "", price: 0.0, count: 0 })
    const [transactions, setTransactions] = useState([])

    const addNewTransaction = (transaction) => {
        transactions.push(transaction)
    }
    const removeTransaction = (transaction) => {
        var old_array = [...transactions]
        var new_array = []
        old_array.forEach(t => {
            if (t != transaction) {
                new_array.push(t)
            }
        });
        setTransactions(new_array)
    }

    return (
        <div className="row mt-2 p-2">
            <div className='col-md-6 offset-md-3'>
                <div className="mb-3 text-center">
                    <h2>
                        Logged in as <i>{user.username}</i>
                    </h2>
                </div>
                <div className="text-right">
                    <button onClick={logout} className={styles.primaryBtn}>
                        Log Out
                    </button>
                </div>
            </div>
            <div className={styles.columnLeft}>
                <div className='col-md-10 offset-md-1'>
                    <div className="mt-2">
                        <input
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Search for a product"
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
                <div className={styles.rowBtnDiv}>
                    <button className={styles.orderBtn}>
                        See Order
                    </button>
                </div>

                <div className={styles.colList}>
                    <h5>Current order</h5>
                    <div>
                        <div>
                            Total price:
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
                            <> kr.</>
                        </b>

                    </div>
                    <div className='list-item mt-4'>
                        {transactions &&
                            transactions.map((transaction) => (
                                <div className="list-group-item">
                                    <div>
                                        <b>{(transaction.count * transaction.product.price).toFixed(2)} kr. </b>
                                    </div>
                                    <b>{transaction.count} x </b>
                                    <b>{transaction.product.name} </b>
                                    <div>
                                        <button className={styles.removeBtn}
                                            onClick={() => { removeTransaction(transaction) }}>
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            {
                isOpen && selectedItem &&
                <Modal
                    setIsOpen={setIsOpen}
                    product={selectedItem}
                    setReturnTransaction={addNewTransaction}
                />
            }
        </div >

    )
}

