'use client'

import Image from 'next/image';
import { useState } from 'react';
import { UploadDropzone } from '@/utils/uploadthing';
import "@uploadthing/react/styles.css";

export default function Page() {
    // const [files, setFiles] = useState<FileList | null>(null);

    // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const files = e.target.files;
    //     setFiles(files);
    // }

    // const isImageFile = (file: File) => {
    //     return file && file['type'].split('/')[0] === 'image';
    // }

    return (
        <div className='flex justify-center'>
            <div className="flex flex-col items-center gap-16 max-h-screen overflow-auto place-content-center place-items-center">
                <div className='container bg-yellow-600 rounded-lg max-w-3xl'>
                    <div className='flex flex-row items-center'>
                        <figure className=' p-2'>
                            <Image
                                src="/alert.png"
                                className="rounded-xl"
                                alt={`Consultar Historial del Turno`}
                                width={56}
                                height={56}
                            />
                        </figure>
                        <div className="flex-grow text-center">
                            <p className="text-3xl font-medium text-white">Reportar Incidente</p>
                        </div>
                    </div>
                </div>
                <div className='flex flex-row gap-14 xl:gap-28'>
                    <div className='flex flex-col'>
                        <label className="form-control min-w-[400px]">
                            <div className="label">
                                <span className="label-text text-lg font-medium">Describe aquí el incidente</span>
                            </div>
                            <textarea className="textarea textarea-bordered h-80" placeholder="Escribe a detalle el acontecimiento..."></textarea>
                        </label>
                        <button className="btn btn-primary mt-10 rounded-lg">Registrar Incidente</button>
                    </div>
                    <div className='flex flex-col mt-2'>
                        {/* <label className="form-control">
                            <div className="label">
                                <span className="label-text text-lg">Adjunta las imagenes del incidente</span>
                            </div>
                            <input type="file" className="file-input file-input-bordered w-full" onChange={handleFileChange} multiple />
                        </label> */}
                        {/* <div className="grid grid-cols-4 gap-4 overflow-y-auto">
                            {
                                files && Array.from(files).map((file, index) => {
                                    return (
                                        <div key={index}>
                                            {
                                                isImageFile(file) && (
                                                    <figure>
                                                        <Image
                                                            src={URL.createObjectURL(file)}
                                                            className="rounded-md"
                                                            alt="Imagen del incidente"
                                                            width={150}
                                                            height={100}
                                                        />
                                                    </figure>
                                                )
                                            }
                                        </div>
                                    )
                                })
                            }
                        </div> */}
                        <p className='text-lg font-medium'> Adjunta evidencia fotográfica del incidente</p>
                        <UploadDropzone
                            endpoint="imageUploader"
                            onClientUploadComplete={(res) => {
                                // Do something with the response
                                console.log("Files: ", res);
                                alert("Upload Completed");
                            }}
                            onUploadError={(error: Error) => {
                                // Do something with the error.
                                alert(`ERROR! ${error.message}`);
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}