'use client'

import Image from 'next/image';
import { useState } from 'react';

export default function Page() {
    const [files, setFiles] = useState<FileList | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        setFiles(files);
    }

    const isImageFile = (file: File) => {
        return file && file['type'].split('/')[0] === 'image';
    }

    return (
        <div className="flex flex-col items-center gap-8 max-h-screen overflow-auto">
            <div className='container bg-yellow-600 rounded-lg max-w-2xl fixed top-32'>
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
            <div className='flex flex-row gap-14 xl:gap-28 fixed top-56'>
                <div className='flex flex-col'>
                    <label className="form-control min-w-[400px]">
                        <div className="label">
                            <span className="label-text text-lg">Describe aquí el incidente</span>
                        </div>
                        <textarea className="textarea textarea-bordered h-80" placeholder="Que sucedio..."></textarea>
                    </label>
                    <button className="btn btn-primary mt-[90px]">Registrar Incidente</button>
                </div>
                <div className='container flex flex-col gap-10 max-h-[500px] min-w-[400px]'>
                    <label className="form-control">
                        <div className="label">
                            <span className="label-text text-lg">Adjunta las imagenes del incidente</span>
                        </div>
                        <input type="file" className="file-input file-input-bordered w-full" onChange={handleFileChange} multiple />
                    </label>
                    <div className="grid grid-cols-4 gap-4 overflow-y-auto">
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
                    </div>
                </div>
            </div>
        </div>
    );
}