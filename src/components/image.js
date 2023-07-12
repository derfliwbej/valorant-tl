'use client';
import { useState } from 'react';
import Image from 'next/image';

const ImageWrapper = ({ className, src, alt, size }) => {
    const [ratio, setRatio] = useState(16 / 9);
    return (
        <>
            <Image className={className} src={src} alt={alt} width={size} height={size / ratio} fixed="true" onLoadingComplete={({ naturalWidth, naturalHeight }) => {
                setRatio(naturalWidth / naturalHeight);
            }} />
        </>
    );
};

export default ImageWrapper;