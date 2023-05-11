import styles from "../styles/messageInput.module.css";
import React from "react";

export interface FileStructure {
    file: File;
    src: string;
}

interface MessageInputSelectedFilesProps {
    files: FileStructure[];
    onImageClick: (fileStructure: FileStructure) => void;
}

export function MessageInputSelectedFiles({files, onImageClick}: MessageInputSelectedFilesProps) {
    if (!files.length) return null;

    return (
        <div className={styles.selectedFilesContainer}>

            {files.map(file =>
                <div>
                    <img
                        onClick={() => onImageClick(file)}
                        key={file.src.slice(0, 12)} alt="" src={file.src}
                    />
                </div>)}
        </div>
    )
}