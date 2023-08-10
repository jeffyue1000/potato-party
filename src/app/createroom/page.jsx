"use client";
import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { useDropzone } from 'react-dropzone';
import "./createroom.css";

export default function Dropzone() {
    const [files, setFiles] = useState([]);
    // const [rejected, setRejected] = useState([]);
    const [loading, setLoading] = useState(false);
    const [uploaded, setUploaded] = useState(false);
    
    const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
        if(acceptedFiles?.length){
            setFiles((previousFiles) => [
                ...previousFiles,
                ...acceptedFiles.map((file) =>
                    Object.assign(file, {preview: URL.createObjectURL(file)})
                )
            ])
        }
        // if(rejectedFiles?.length){
        //     setRejected((previousFiles) => [...previousFiles, ...rejectedFiles]);
        // }
    }, [])
    
    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop,
        accept: {
            "video/mp4": []
        },
        maxSize: 2560 * Math.pow(10, 6),
        maxFiles: 1
    })

    useEffect(() => {
        return () => files.forEach(file => URL.revokeObjectURL(file.preview))
    }, [files])
    
    const removeFile = (name) => {
        setFiles((files) => files.filter(file => file.name !== name));
    }

    const handleSubmit = async e => {
        e.preventDefault();

        if(!files.length){
            return;
        }

        const formData = new FormData();
        files.forEach((file) => formData.append('file', file));
        files.forEach((file) => formData.append('public_id', file.name));

        formData.append('upload_preset', 'potatocouch')
        const URL = process.env.NEXT_PUBLIC_CLOUDINARY_URL;
        
        setLoading(true);
        const response = await axios.post(URL, formData);
        setLoading(false);
        setUploaded(true);

        const data = response.data; 

        console.log(data);
    }

    return (
        <div className="container">
            <div className="title">Potato Couch Logo</div>
            <div className="upload-video-box">
                <h1 className="upload-header">{loading ? "Loading..." : "Upload Video"}</h1>
                <p className="upload-desc">Begin by uploading a .mp4 file below. (max 2.5GB)</p>
                <form onSubmit={handleSubmit} className="form">
                    <div className="drop-box" {...getRootProps()}>
                        <input {...getInputProps()}/>
                            {isDragActive ? (
                                <p>Drop the video here ...</p>
                            ) : (
                                <div>
                                    <p>Drag and drop a video here</p> 
                                    <p>or</p>
                                    <p>Click to select video</p>
                                </div>
                            )}
                    </div>
                    {uploaded ? <></> : files.map(file => (
                        <div className="video-preview-box" key={file.name}>
                            <p>Preview:</p>
                            <video className="video-preview" width="320" height="180" controls>
                                <source src={file.preview} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                            <div className="preview-btns">
                                <button className="remove-btn" onClick={() => removeFile(file.name)}>Remove</button>
                                <button className="submit-btn" type="submit">Upload</button>
                            </div>
                        </div>
                    ))}
                </form>
            </div>
        </div>
    )
}