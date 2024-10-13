import Image from "next/image";

export default function Profile() {

    return (
        <div className="flex items-center justify-center min-h-screen h-screen">
            <div className="rounded-xl card card-side bg-base-100 shadow-2xl w-1/3 h-1/2">
                <div className="w-1/3 bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-500 flex items-center justify-center relative rounded-xl">
                    <div className="avatar absolute -top-12">
                        <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring ring-offset-2">
                            <Image
                                src="/cool-avatar.jpg"
                                className="rounded-xl"
                                alt={`Consultar Historial del Turno`}
                                width={320}
                                height={320}
                            />
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <h2 className="card-title">Información</h2>
                    <div className="divider"></div>
                    <div className="flex flex-col mb-4">
                        <div className="flex flex-col mb-3">
                            <h3 className="font-semibold text-base">Nombre:</h3>
                            <p>Yuri Jimenez</p>
                        </div>
                        <div className="flex flex-col mb-3">
                            <h3 className="font-semibold text-base">Cargo:</h3>
                            <p>Empleado</p>
                        </div>
                        <div className="flex flex-col mb-3">
                            <h3 className="font-semibold text-base">Celular:</h3>
                            <p>(+57) 3148944838</p>
                        </div>
                        <div className="flex flex-col mb-3">
                            <h3 className="font-semibold text-base">Número de Identificación:</h3>
                            <p>46982590</p>
                        </div>
                    </div>
                    {/* <div className="card-actions justify-end">
                        <button className="btn btn-primary">Editar</button>
                    </div> */}
                </div>
            </div>
        </div>
    );

}