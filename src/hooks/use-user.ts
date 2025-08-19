
"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

type User = {
    id: number;
    username: string;
    role: string;
};

export function useUser() {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    useEffect(() => {
        try {
            const loggedInUser = localStorage.getItem('loggedInUser');
            if (loggedInUser) {
                setUser(JSON.parse(loggedInUser));
            }
        } catch (error) {
            console.error("Failed to parse user from localStorage", error);
            localStorage.removeItem('loggedInUser');
        }
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem('loggedInUser');
        setUser(null);
        router.push('/');
    }, [router]);

    return { user, logout };
}
