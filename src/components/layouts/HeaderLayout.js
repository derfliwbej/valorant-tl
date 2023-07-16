'use client';
import fetchUtil from "@/utils/fetchUtil";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../providers/AuthProvider";
import Avatar from "@/components/ui/Avatar";
import { Anton } from "next/font/google";

const anton = Anton({
    subsets: ['latin'],
    weight: '400'
});

export default function HeaderLayout({ children }) {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const { user, isLoading } = useAuth();

    const handleLogout = async () => {
        await fetchUtil('/api/logout');
        router.push('/');
    }

    const handleDrawerOpen = () => {
        setOpen(true);
    }

    const handleDrawerClose = () => {
        setOpen(false);
    }

    return (
        <>
            <div className={`${anton.className} bg-slate-900 flex flex-col fixed top-0 h-full shadow-2xl ` + (open ? 'animate-drawer-open z-20' : '-left-full') }>
                <div className="flex flex-col justify-center items-center py-5 px-8 gap-3 min-w-[225px]">
                    <Avatar size={75} />
                    {user && (
                        <>
                            <div className="flex gap-2 items-center">
                                <h1 className="text-2xl text-red-500">{user?.game_name}</h1>
                                <h3 className="text-gray-500">#{user?.tag_line}</h3>
                            </div>
                            <button className="bg-red-500 px-5 py-1 rounded-2xl shadow-2xl" onClick={handleLogout}>
                                Logout
                            </button>
                        </>
                    )}
                    {!user && (
                        <>
                            <div className="bg-slate-500 rounded-md animate-pulse w-fit">
                                <span className="invisible text-2xl">
                                    AAAAAAAA
                                </span>
                            </div>

                            <div className="bg-slate-500 rounded-md animate-pulse w-fit">
                                <span className="invisible">
                                    <h3>#000000</h3>
                                </span>
                            </div>

                            <button disabled={true} className="bg-gray-600 rounded-md">
                                Logout
                            </button>
                        </>
                    )}
                    
                    
                </div>
                <hr className="border-slate-500" />
                <div className="p-5">
                    <ul>
                        <li className="p-3 flex gap-5 items-center rounded-md hover:cursor-pointer hover:bg-slate-700" onClick={ () => router.push('/store') }>
                            <span><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512" fill="#fff"><path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/></svg></span>
                            Storefront
                        </li>
                        <li className="p-3 flex gap-5 items-center rounded-md hover:cursor-pointer hover:bg-slate-700" onClick={ () => router.push('/penalties') }>
                            <span><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" fill="#fff"><path d="M367.2 412.5L99.5 144.8C77.1 176.1 64 214.5 64 256c0 106 86 192 192 192c41.5 0 79.9-13.1 111.2-35.5zm45.3-45.3C434.9 335.9 448 297.5 448 256c0-106-86-192-192-192c-41.5 0-79.9 13.1-111.2 35.5L412.5 367.2zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z"/></svg></span>
                            Penalties
                        </li>
                    </ul>
                </div>
            </div>
            {open && <div className="fixed w-full h-full min-h-screen top-0 left-0 opacity-80 animate-show-overlay bg-gray-950 z-10" onClick={handleDrawerClose}></div>}
            <div className={`${anton.className} bg-slate-900 shadow-2xl flex items-center gap-10 px-5 py-3`}>
                <span className="cursor-pointer shadow-2xl" onClick={handleDrawerOpen}>
                    <Avatar size={40} />
                </span>
                <h1 className="text-4xl text-red-500">ValorantTL</h1>
            </div>
            <main className="p-5">
                {children}
            </main>
        </>
    );
}