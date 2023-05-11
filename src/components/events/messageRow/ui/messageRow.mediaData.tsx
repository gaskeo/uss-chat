import React, {useEffect, useRef} from "react";
import {getImage} from "@/storage";
import styles from "../styles/messageRow.module.css";

interface MessageMediaDataProps {
    media: string[] | undefined;
    onImageClick: (src: string) => void;
}

export function MessageRowMediaData({media, onImageClick}: MessageMediaDataProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (media?.length && containerRef?.current)
            media.map((name, index) => getImage(name).then(content => {
                    if (containerRef?.current) {
                        const ref: HTMLImageElement = containerRef.current.children[index] as HTMLImageElement;
                        if (ref) {
                            ref.src = content || "";
                            ref.onclick = () => onImageClick(content || "");
                        }
                    }
                })
            );
    })

    if (!media?.length) return null;

    return (
        <div ref={containerRef} className={styles.messageMediaDataContainer} data-items={media.length}>
            {media.map((name) => (
                <img key={name} alt="" className={styles.messageMediaDataItem}/>))}
        </div>
    )
}
