'use client';

import HeaderLayout from "@/components/layouts/HeaderLayout";
import { useRouter } from "next/navigation";
import { Anton } from "next/font/google";

const anton = Anton({
    subsets: ['latin'],
    weight: '400'
});

export default function Store() {
    return (
        <HeaderLayout>
            <h1 className={`${anton.className} text-3xl text-red-500`}>Storefront</h1>
        </HeaderLayout>
    );
}