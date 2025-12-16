// import { useEffect, useState, type ChangeEvent } from "react";
// import Cropper from "react-easy-crop";
// import getCroppedImg from "../../../utils/common";
// import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
// import { useSelector } from "react-redux";
// import type { RootState } from "../../../store/store";
// import { upload_image } from "../../../services/apis/common";
// import SubmitButton from "../../../utils/elements/SubmitButton";




// type CropArea = {
//     x: number;
//     y: number;
//     width: number;
//     height: number;
// };




// export default function UploadSection() {
//     const [uploadOpen, setUploadOpen] = useState(false);
//     const [selectedFile, setSelectedFile] = useState<File | null>(null);
//     const [uploading, setUploading] = useState<boolean>(false);
//     const [previewUrl, setPreviewUrl] = useState<string>("");

//     const [crop, setCrop] = useState({ x: 0, y: 0 });
//     const [zoom, setZoom] = useState(1);
//     const [croppedAreaPixels, setCroppedAreaPixels] = useState<CropArea | null>(null);






//     useEffect(() => {
//         document.body.style.overflow = uploadOpen ? "hidden" : "auto";
//         return () => {
//             document.body.style.overflow = "auto";
//         };
//     }, [uploadOpen]);




//     useEffect(() => {
//         if (!selectedFile) return;

//         const url = URL.createObjectURL(selectedFile);
//         setPreviewUrl(url);

//         return () => {
//             URL.revokeObjectURL(url);
//         };
//     }, [selectedFile]);





//     const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
//         const file = e.target.files?.[0];
//         if (!file) return;

//         setSelectedFile(file);
//         setUploadOpen(true);
//     };





//     const handleUpload = async () => {
//         if (!selectedFile || !croppedAreaPixels) return;

//         const blob = await getCroppedImg(
//             selectedFile,
//             croppedAreaPixels,
//             400,
//             400
//         );

//         const croppedFile = new File(
//             [blob],
//             selectedFile.name,
//             { type: selectedFile.type }
//         );

//         console.log("Cropped File:", croppedFile);

//         setUploading(true);
//         const response = await upload_image(croppedFile);
//         setUploading(false);

//         console.log(response, "response")

//         if (!response.status) {
//             return;
//         }



//         setSelectedFile(null);
//         setPreviewUrl("");
//         setZoom(1);
//         setCrop({ x: 0, y: 0 });
//         setUploadOpen(false);
//     };






//     return (
//         <>
//             {!uploadOpen && (
//                 <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4 mb-6 mr-10">
//                     <label
//                         className="
//                             w-25
//                             h-30
//                             flex flex-col items-center justify-center gap-2
//                             rounded-lg
//                             border-2 border-dashed border-(--border-color)
//                             cursor-pointer
//                             transition
//                             hover:border-(--accent-color)
//                             hover:bg-(--secondary-bg-color)
//                         "
//                     >
//                         <PlusIcon className="h-8 w-8 text-(--accent-color)" />
//                         <span className="text-xs text-(--primary-text-color)">
//                             Upload Image
//                         </span>
//                         <input
//                             type="file"
//                             accept="image/*"
//                             className="hidden"
//                             onChange={handleFileChange}
//                         />
//                     </label>
//                 </div>
//             )}

//             {uploadOpen && selectedFile && (
//                 <div className="fixed inset-0 z-50 flex flex-col bg-[rgba(0,0,0,0.8)]">
//                     <button
//                         onClick={() => {
//                             setUploadOpen(false);
//                             setSelectedFile(null);
//                             setPreviewUrl("");
//                         }}
//                         className="
//                             absolute top-4 right-4 z-50
//                             p-2 rounded-full
//                             bg-(--secondary-bg-color)
//                             border border-(--border-color)
//                             hover:bg-(--primary-bg-color)
//                         "
//                     >
//                         <XMarkIcon className="h-5 w-5 text-(--primary-text-color)" />
//                     </button>

//                     <div className="flex-1 flex items-center justify-center px-3">
//                         <div
//                             className="
//                                 relative
//                                 w-full max-w-[420px]
//                                 h-[420px]
//                                 bg-(--primary-bg-color)
//                                 rounded-xl
//                                 overflow-hidden
//                             "
//                         >
//                             <Cropper
//                                 image={previewUrl}
//                                 crop={crop}
//                                 zoom={zoom}
//                                 aspect={1}
//                                 onCropChange={setCrop}
//                                 onZoomChange={setZoom}
//                                 onCropComplete={(_, pixels) =>
//                                     setCroppedAreaPixels(pixels)
//                                 }
//                                 objectFit="contain"
//                             />
//                         </div>
//                     </div>

//                     <div
//                         className="
//                             px-4 py-3
//                             flex items-center gap-4
//                             bg-(--secondary-bg-color)
//                             border-t border-(--border-color)
//                         "
//                     >
//                         <button
//                             onClick={() => {
//                                 setUploadOpen(false);
//                                 setSelectedFile(null);
//                                 setPreviewUrl("");
//                             }}
//                             className="
//                                 px-4 py-2
//                                 rounded-lg
//                                 border border-(--border-color)
//                                 text-(--primary-text-color)
//                             "
//                         >
//                             Cancel
//                         </button>

//                         <input
//                             type="range"
//                             min={1}
//                             max={3}
//                             step={0.1}
//                             value={zoom}
//                             onChange={(e) => setZoom(Number(e.target.value))}
//                             className="flex-1"
//                         />

//                         <div className="w-40" onClick={handleUpload}>
//                             <SubmitButton text={"Upload Now"} loading={uploading} />
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </>
//     );
// }







import { useEffect, useState, type ChangeEvent } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "../../../utils/common";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { upload_image } from "../../../services/apis/common";
import SubmitButton from "../../../utils/elements/SubmitButton";



type CropArea = {
    x: number;
    y: number;
    width: number;
    height: number;
};



export default function UploadSection() {
    const [uploadOpen, setUploadOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [previewUrl, setPreviewUrl] = useState("");

    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<CropArea | null>(null);



    useEffect(() => {
        document.body.style.overflow = uploadOpen ? "hidden" : "auto";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [uploadOpen]);




    useEffect(() => {
        if (!selectedFile) return;
        const url = URL.createObjectURL(selectedFile);
        setPreviewUrl(url);
        return () => URL.revokeObjectURL(url);
    }, [selectedFile]);




    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setSelectedFile(file);
        setUploadOpen(true);
    };




    const handleUpload = async () => {
        if (!selectedFile || !croppedAreaPixels) return;

        const blob = await getCroppedImg(selectedFile, croppedAreaPixels, 400, 400);
        const croppedFile = new File([blob], selectedFile.name, {
            type: selectedFile.type,
        });

        setUploading(true);
        const response = await upload_image(croppedFile);
        setUploading(false);

        if (!response.status) return;

        setSelectedFile(null);
        setPreviewUrl("");
        setZoom(1);
        setCrop({ x: 0, y: 0 });
        setUploadOpen(false);
    };





    return (
        <>
            {!uploadOpen && (
                <label
                    className="
                        relative aspect-square
                        rounded-xl
                        border-2 border-dashed
                        border-(--border-color)
                        flex flex-col items-center justify-center gap-2
                        cursor-pointer
                        transition
                        hover:border-(--accent-color)
                        hover:bg-(--secondary-bg-color)
                    "
                >
                    <PlusIcon className="h-8 w-8 text-(--accent-color)" />
                    <span className="text-[10px] text-(--primary-text-color)">
                        Upload Image
                    </span>

                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                    />
                </label>
            )}

            {uploadOpen && selectedFile && (
                <div className="fixed inset-0 z-50 flex flex-col bg-[rgba(0,0,0,0.8)]">
                    <button
                        onClick={() => {
                            setUploadOpen(false);
                            setSelectedFile(null);
                            setPreviewUrl("");
                        }}
                        className="
                            absolute top-4 right-4 z-50
                            p-2 rounded-full
                            bg-(--secondary-bg-color)
                            border border-(--border-color)
                        "
                    >
                        <XMarkIcon className="h-5 w-5 text-(--primary-text-color)" />
                    </button>

                    <div className="flex-1 flex items-center justify-center px-3">
                        <div className="relative w-full max-w-[420px] h-[420px] bg-(--primary-bg-color) rounded-xl overflow-hidden">
                            <Cropper
                                image={previewUrl}
                                crop={crop}
                                zoom={zoom}
                                aspect={1}
                                onCropChange={setCrop}
                                onZoomChange={setZoom}
                                onCropComplete={(_, pixels) =>
                                    setCroppedAreaPixels(pixels)
                                }
                                objectFit="contain"
                            />
                        </div>
                    </div>

                    <div className="px-4 py-3 flex items-center gap-4 bg-(--secondary-bg-color)">
                        <button
                            onClick={() => {
                                setUploadOpen(false);
                                setSelectedFile(null);
                                setPreviewUrl("");
                            }}
                            className="px-4 py-2 rounded-lg border border-(--border-color)"
                        >
                            Cancel
                        </button>

                        <input
                            type="range"
                            min={1}
                            max={3}
                            step={0.1}
                            value={zoom}
                            onChange={(e) => setZoom(Number(e.target.value))}
                            className="flex-1"
                        />

                        <div className="w-40" onClick={handleUpload}>
                            <SubmitButton text="Upload Now" loading={uploading} />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
