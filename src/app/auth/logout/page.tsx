'use client';

import { useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
    const router = useRouter();

    useEffect(() => {
        const handleLogout = async () => {
            try {
                await signOut(auth);
                router.push('/auth/login');
            } catch (error) {
                console.error('Error sigining out:', error);
                router.push('/auth/login');
            }
        };

        handleLogout();
    }, [router]);

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Signing out...</p>
            </div>
        </div>
    );
}