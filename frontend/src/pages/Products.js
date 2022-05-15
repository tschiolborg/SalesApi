import { useState } from 'react'
import { rj, useRunRj } from 'react-rocketjump'
import { ajax } from 'rxjs/ajax'
import { useAuthActions, useAuthUser } from 'use-eazy-auth'
import ProductCard from '../components/ProductCard'

const ProductsState = rj({
    //effectCaller: rj.configured(),
    // effect: (token) => (search = '') =>
    //     ajax.getJSON(`/products/?search=${search}`, {
    //         Authorization: `Bearer ${token}`,
    //     }),
    effect: (search = '') => ajax.getJSON(`/products/?search=${search}`)
})

export default function Products() {
    const { user } = useAuthUser()
    const { logout } = useAuthActions()
    const [search, setSearch] = useState('')
    const [{ data: products }] = useRunRj(ProductsState, [search], false) // trigger api call

    return (
        <div className="row mt-2 p-2">
            <div className="col-md-6 offset-md-3">
                <div className="mb-3 text-center">
                    <h1>
                        Logged in as <i>@{user.username}</i>
                    </h1>
                </div>
                <div className="text-right">
                    <button onClick={logout} className="btn btn-light">
                        Log Out
                    </button>
                </div>
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
                            <ProductCard key={product.id} product={product} />
                        ))}
                </div>
            </div>
        </div>
    )
}


