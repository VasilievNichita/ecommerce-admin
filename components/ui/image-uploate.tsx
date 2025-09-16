"use client"

import { count } from "console";
import { useEffect, useState } from "react";

interface ImageUploadProps {
    dusabled?: boolean;
    onChange: (value:string) => void;
    onRemove: (value:string) => void;
    value: string[];
}

export const ImageUpload:React.FC<ImageUploadProps> = ({
    dusabled,
    onChange,
    onRemove,
    value
}) => {
      const [isMounted, setIsMounted] = useState(false);
    
        useEffect(() => {
            setIsMounted(true);
        }, []);
    

    const onUpload = (result: any) => {
        onChange(result.info.secure_url);
    }

     if (!isMounted) {
            return null;
        }
    return (
        <div>ImageUpload</div>
    )
}

export default ImageUpload;