'use client';

import { Anton } from "next/font/google";
import UserContextWrapper from "@/components/layouts/UserContextWrapper";
import StoreItem from "@/components/store/StoreItem";
import StoreItemSkeleton from "@/components/store/StoreItemSkeleton";
import useSWR from "swr";
import fetchUtil from "@/utils/fetchUtil";

const anton = Anton({
    subsets: ['latin'],
    weight: '400'
});

export default function Store() {
    const { data: items, isLoading, error } = useSWR("api/store", async (url) => {
        const res = await fetchUtil(`/${url}`);

        if (res.status >= 400) return null;

        const { items } = await res.json();

        return items;
    });

    return (
        <UserContextWrapper>
            <h1 className={`${anton.className} text-3xl text-red-500 mb-5`}>Storefront</h1>
            {error && 'Error fetching items'}
            <div className="flex flex-wrap justify-evenly gap-5">
                {!isLoading && items ? items.map( (item, i) => {
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
        </UserContextWrapper>
    );
}