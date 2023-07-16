'use client';
import StoreItem from "@/components/store/StoreItem";
import StoreItemSkeleton from "@/components/store/StoreItemSkeleton";
import useSWR from "swr";
import fetchUtil from "@/utils/fetchUtil";
import { useAuth } from "@/components/providers/AuthProvider";

export default function Storefront() {
    const { user } = useAuth();

    const { data: items, isLoading, error } = useSWR(`/api/store/${user?.puuid}`, async () => {
        const res = await fetchUtil("/api/store");

        if (res.status >= 400) return null;

        const { items } = await res.json();

        return items;
    });

    return (
        <div className="flex flex-wrap justify-evenly gap-5">
            { !error && !isLoading && items ? items.map( (item, i) => {
                return <StoreItem key={i} name={item.name} cost={item.cost} displayIcon={item.displayIcon} />
            }) : (
                <>
                    <StoreItemSkeleton />
                    <StoreItemSkeleton />
                    <StoreItemSkeleton />
                    <StoreItemSkeleton />
                </>
            )}
        </div>
    );
}