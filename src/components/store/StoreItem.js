import Image from "next/image";
import { Anton } from "next/font/google";

const anton = Anton({
    subsets: ['latin'],
    weight: '400'
});

export default function StoreItem({ name, cost, displayIcon }) {
    return (
        <div className="bg-slate-900 px-3 py-5 flex flex-col gap-5 rounded-md shadow-2xl">
            <div className="flex items-center justify-center flex-grow">
                <Image src={displayIcon} alt={name} height={300} width={300} />
            </div>
            <div className={`${anton.className} text-xl`}>
                <h1>{name}</h1>
                <h1 className="flex gap-3 items-center"><span><Image priority src="/valorant-points-icon.png" height={25} width={25} /></span>{cost}</h1>
            </div>
        </div>
    );
}