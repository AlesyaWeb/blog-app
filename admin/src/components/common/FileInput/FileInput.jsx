import React, {useEffect, useState} from 'react';
import ImagePreview from "./ImagePreview/ImagePreview";
import {useForm} from "react-hook-form";
import {imageValidate} from "../../../helpers/ImageValidate";
import Errors from "../Errors/Errors";
const FileInput = ({ withImagePreview, image, setImage }) => {
    const [errors, setErrors] = useState([])
    const [imgForPreview, setImgForPreview] = useState(null)
    const fileReader = (file) => {
        const isValid = imageValidate(file)
        if(!isValid) {
            setErrors([{message: "U may upload only png, jpeg or jpg files"}])
            return false
        }
        if(!file) return false
        return Object.assign(file, {
            preview: URL.createObjectURL(file)
        });
    }
    const onFileAdd = (e) => {
        setErrors([])
        console.log(e.target.files[0])
        const img = e.target.files[0]
        setImage(img)
        console.log(image)
        setImgForPreview(fileReader(e.target.files[0]))
    }
    return (
        <div>
            <label
                className={"w-36 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue-400 hover:text-white"}>
                <svg className={"w-8 h-8"} fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path
                        d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z"/>
                </svg>
                <span className={"mt-2 text-base leading-normal"}>Select a file</span>
                <input onChange={onFileAdd} type='file' accept="image/*" className={"hidden"}/>
            </label>
            {withImagePreview && <ImagePreview image={image?.preview} />}
            <Errors validationErrors={errors} />
        </div>
    );
};

export default FileInput;