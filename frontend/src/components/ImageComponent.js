import React, { useEffect, useState } from "react";

export default function ImageComponent({ link }) {
    const [img, setImg] = useState();

    const fetchImage = async () => {
        const res = await fetch(link);
        const imageBlob = await res.blob();
        const imageObjectURL = URL.createObjectURL(imageBlob);
        setImg(imageObjectURL);
    };

    useEffect(() => {
        fetchImage();
    }, []);

    return (
        <>
            <img src={img} className="myImage" alt="icons" />
        </>
    );
}