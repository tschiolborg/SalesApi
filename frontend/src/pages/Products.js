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

export default function Products() {
    const { user } = useAuthUser()
    const { logout } = useAuthActions()
    const [search, setSearch] = useState('')
    const [{ data: products }] = useRunRj(ProductsState, [search], false) // trigger api call
    const [isOpen, setIsOpen] = useState(false)
    const [selectedItem, setSelectedItem] = useState({ name: "", price: 0.0, count: 0 })

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
                <div className='col-md-6 offset-md-1'>
                    <div className="mt-2">
                        <input
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Search for a product"
                            style={{ fontSize: 22 }}
                            className="form-control"
                        />
                    </div>
                    <div className='list-item mt-5'>
                        {products &&
                            products.map((product) => (
                                <div key={product.id} onClick={() => { setIsOpen(true); setSelectedItem(product) }}>
                                    <ProductCard key={product.id} product={product} />
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            <div className={styles.columnRight}>
                HEJ
            </div>
            {
                isOpen && selectedItem &&
                <Modal setIsOpen={setIsOpen} product={selectedItem} />
            }
        </div >

    )
}


