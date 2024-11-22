import { getServerSession } from 'next-auth/next';
import { options } from '@/app/api/auth/[...nextauth]/options';
import { redirect } from 'next/navigation';

export default async function Profile() {

    const session = await getServerSession(options);
    if (!session) {
        redirect('/api/auth/signin');
    }

    const userName = 'name' in session.user && typeof session.user.name === "string" ? session.user.name : 'Avatar';
    const userRole = session.user.role;

    return (
        <div className="flex items-center justify-center min-h-screen h-screen">
            <div className="rounded-xl card card-side bg-base-100 shadow-2xl w-1/3 h-1/2">
                <div className="w-1/3 bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-500 flex items-center justify-center relative rounded-xl">
                    <div className="avatar absolute -top-12">
                        <div className="ring ring-primary ring-offset-base-100 w-24 rounded-full bg-white">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-24">
                                <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <h2 className="card-title">Información</h2>
                    <div className="divider"></div>
                    <div className="flex flex-col mb-4">
                        <div className="flex flex-col mb-3">
                            <h3 className="font-semibold text-base">Nombre:</h3>
                            <p>{userName}</p>
                        </div>
                        <div className="flex flex-col mb-3">
                            <h3 className="font-semibold text-base">Cargo:</h3>
                            <p>{userRole}</p>
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