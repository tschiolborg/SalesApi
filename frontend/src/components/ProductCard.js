export default function ProductCard({ product }) {
    return (
        <div className="list-group-item">
            <div>
                <b>{product.name}</b>
            </div>
            <div>
                <b>Count: {product.count}</b>
            </div>
            <div>
                <b>Price: {product.price}</b>
            </div>
        </div>
    )
}