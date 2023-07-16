import { Anton } from "next/font/google";
import UserContextWrapper from "@/components/layouts/UserContextWrapper";
import Penalties from "./Penalties";

const anton = Anton({
    subsets: ['latin'],
    weight: '400'
});

export default function PenaltiesPage() {

    return (
        <UserContextWrapper>
            <h1 className={`${anton.className} text-3xl text-center text-red-500 mb-5`}>Penalties</h1>
            <Penalties />
        </UserContextWrapper>
    );
}