import useSWR from "swr";
import { useAuth } from "@/components/providers/AuthProvider";
import Image from "next/image";

const DefaultIcon = ({ size }) => {
    return <div style={{ height: `${size}px`, 
                         width: `${size}px` }} 
                         className="bg-slate-500 rounded-full animate-pulse"></div>
};

export default function Avatar({ size }) {
    const { user } = useAuth();

    const avatarFetcher = async (id) => {
        const res = await fetch(`https://valorant-api.com/v1/playercards/${id}`);

        if (res.status >= 400) {
            return null;
        }

        const body = await res.json();
        const { displayIcon } = body.data;

        return displayIcon;
    };

    const { data: avatarURL, isLoading: avatarLoading, error: avatarError } = useSWR(user?.card_id, avatarFetcher);

    if (!avatarLoading && avatarURL) {
        return (
            <Image className="rounded-full" src={avatarURL} alt="Player Card" height={size} width={size} />
        );
    } else return <DefaultIcon size={size} />
}