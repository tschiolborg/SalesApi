import React from "react";
import styles from "../styles/ProductCard.module.css"
import ImageComponent from "./ImageComponent"

export default function ProductCard({ product }) {
    return (
        <div className={styles.div}>
            <div className={styles.list_group_item}>
                <div>
                    <p><b>{product.name} : ({product.count} restants)</b></p>
                </div>
                <div>
                    <ImageComponent link={product.image} />
                </div>
            </div>
        </div>
    )
}
