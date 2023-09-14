"use client";
import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { useDropzone } from 'react-dropzone';
import { useRouter } from "next/navigation";
import "./createroom.css";

export default function Dropzone() {
    const router = useRouter();
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [canDrop, setCanDrop] = useState(true);
    const [fileName, setFileName] = useState("");
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
    }, [])
    
    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop,
        accept: {
            "video/mp4": []
        },
        maxSize: 104857600,
        maxFiles: 1
    })

    useEffect(() => {
        if(files.length >= 1){
            setCanDrop(false);
        }
        else{
            setCanDrop(true);
        }
        return () => files.forEach(file => URL.revokeObjectURL(file.preview))
    }, [files])
    
    const removeFile = (name) => {
        setFiles((files) => files.filter(file => file.name !== name));
    }

    const handleSubmit = async(e) => {
        try{
            e.preventDefault();

            if(!files.length){
                return;
            }
    
            const formData = new FormData();
            files.forEach((file) => {
                formData.append('file', file);
                formData.append('public_id', file.name);
                setFileName(file.name);
            })

            formData.append('upload_preset', 'potatocouch')
            const URL = process.env.NEXT_PUBLIC_CLOUDINARY_URL;
            
            setLoading(true);
            const response = await axios.post(URL, formData);
            setLoading(false);
            setUploaded(true);
    
            const data = response.data; 
    
            console.log(data);
        } catch(error){
            console.log(error.message);
        }
    }

    const onUpload = async() => {
        try{
            const uuid = crypto.randomUUID();
            await axios.post("/api/users/uploadVideo", {fileName, uuid});
            router.push(`/joinroom/${uuid}`);
        } catch(error){
            console.log(error.message);
        }
    }
    
    const logout = async() => {
        try{
            await axios.get("/api/users/logout");
            router.push("/login");
        } catch(error){
            console.log(error.message);
        }
    }

    return (
        <div className="container">
            <div className="title">Potato Party Logo</div>
            <div className="upload-video-box">
                <h1 className="upload-header">{loading ? "Loading..." : "Upload Video"}</h1>
                <p className="upload-desc">Begin by uploading a .mp4 file below. (max 100MB)</p>
                <form onSubmit={handleSubmit} className="form">
                    {canDrop ? 
                        <div className="drop-box" id="test" {...getRootProps()}>
                            <input id="test"{...getInputProps()}/>
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
                        :
                        files.map(file => (
                            <div className="video-preview-box" key={file.name}>
                                <div className="placeholder">Preview:</div>
                                <video className="video-preview" width="320" height="180" controls>
                                    <source src={file.preview} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                                <div className="preview-btns">
                                    <button className="remove-btn" onClick={() => removeFile(file.name)}>Remove</button>
                                    <button className="submit-btn" type="submit">Upload</button>
                                </div>
                            </div>
                        ))
                    }
                </form>
                {uploaded ? 
                    <button className="proceed-btn" onClick={onUpload}>Proceed to Your Room</button> 
                    :
                    <></>
                }
                <div className="navigation-btns">
                    <button className="dashboard-btn" onClick={() => router.push("/dashboard")}>Return to Dashboard</button>
                    <button className="logout-btn" onClick={logout}>Return to Login</button>
                </div>
            </div>
        </div>
    )
}