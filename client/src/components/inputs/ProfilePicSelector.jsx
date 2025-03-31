import React, {useState, useRef} from 'react';
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";

const ProfilePicSelector = ({image, setImage}) => {
    const inputRef = useRef(null)
    const [previewUrl, setPreviewUrl] = useState(null)

    const handleImageChange = (event) => {
        const file = event.target.files[0]
        if (file) {
            //     Update the image state
            setImage(file)
            // Create a preview URL for the selected image
            const preview = URL.createObjectURL(file)
            setPreviewUrl(preview)
        }
    }
    const handleRemoveImage = () => {
        setImage(null)
        setPreviewUrl(null)
    }

    const onChooseFile = () => {
        inputRef.current.click()
    }
    return (
        <div className={' flex justify-center mb-6'}>
            <input className={' hidden'} type={'file'} accept={'image/*'} ref={inputRef} onChange={handleImageChange}/>

            {!image ? (
                <div className={' w-20 h-20 flex items-center justify-center bg-purple-100 rounded-full relative'}>
                    <LuUser className={' text-4xl text-primary'}/>
                    <button className={' w-8 h-8 flex items-center justify-center bg-primary text-white rounded-full absolute -bottom-1 -right-1'} type={'button'} onClick={onChooseFile}>
                        <LuUpload />
                    </button>
                </div>
            ) : (
                <div className={' relative'}>
                    <img className={' w-20 h-20 rounded-full object-cover'} src={previewUrl} alt={'profile photo'}/>
                    <button className={' w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full absolute -bottom-1 -right-1'} type={'button'} onClick={handleRemoveImage}>
                        <LuTrash />
                    </button>
                </div>
            )}
        </div>


    );
};

export default ProfilePicSelector;