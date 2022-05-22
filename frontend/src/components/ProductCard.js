import React from "react";
import styles from "../styles/ProductCard.module.css"
import ImageComponent from "./ImageComponent"

export default function ProductCard({ product }) {
    return (
        <div className={styles.div}>
            <div className="list-group-item">
                <div>
                    <p><b>{product.name} : ({product.count} left)</b></p>
                </div>
                <div>
                    <ImageComponent link={product.image.match("/media/images/.+")} />
                </div>
            </div>
        </div>
    )
}
