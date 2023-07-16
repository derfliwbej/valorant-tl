import { Anton } from "next/font/google";
import UserContextWrapper from "@/components/layouts/UserContextWrapper";
import Storefront from "@/components/store/Storefront";

const anton = Anton({
    subsets: ['latin'],
    weight: '400'
});

export default function Store() {

    return (
        <UserContextWrapper>
            <h1 className={`${anton.className} text-3xl text-red-500 mb-5`}>Storefront</h1>
            <Storefront />
        </UserContextWrapper>
    );
}