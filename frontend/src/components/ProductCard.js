import styles from "./ProductCard.module.css"
import ImageComponent from "./ImageComponent"

export default function ProductCard({ product }) {
    return (
        <div className={styles.div}>
            <div className="list-group-item">
                <div>
                    <b>{product.name} : ({product.count} left)</b>
                </div>
                <div>
                    <ImageComponent link={product.image.match("/media/images/.+")} />
                </div>
            </div>
        </div>
    )
}