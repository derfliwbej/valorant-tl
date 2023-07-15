"use client";
import { createContext, useContext, useState } from "react";
import { useRouter } from "next/navigation";
import useSWR from "swr";

export const AuthContext = createContext({
    user: null,
    error: null,
    isLoading: true,
});

export default function AuthProvider({ children }) {
    const router = useRouter();

    const getUser = async () => {
        const res = await fetch('http://localhost:3000/api/user');
        const body = await res.json();

        if(res.status >= 400) {
            router.push('/');
            return null;
        } else {
            return body;
        }
    };

    const { data: user, error, isLoading } = useSWR("/api/user", getUser);

    const exposed = {
        user,
        error,
        isLoading
    };

    return <AuthContext.Provider value={exposed}>{children}</AuthContext.Provider>
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used inside AuthProvider");
    } else {
        return context;
    }
};