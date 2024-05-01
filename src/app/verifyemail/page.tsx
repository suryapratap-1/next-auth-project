'use client';
import axios from "axios";
import Link from "next/link";
// import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function VerifyEmailPage() {
    // const router = useRouter();
    const [Token, setToken] = useState('');
    const [Verified, setVerified] = useState(false);
    const [Error, setError] = useState(false);

    const verifyEmail = async () => {
        try {
            await axios.post("/api/user/verifyemail", {Token});
            setVerified(true);
            setError(false);
        } 
        catch (error: any) {
            setError(true);
            console.log(error.response.data)
        }
    }

    useEffect(() => {
        setError(false);
        const urlToken = window.location.search.split("=")[1]
        setToken(urlToken || "");

        // const {query} = router;
        // const urlTokenTwo = query.token;

    }, [])
    useEffect(() => {
        if (Token.length > 0) {
            verifyEmail()
        }
    }, [Token])
    
    
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">

            <h1 className="text-4xl">Verify Email</h1>
            <h2 className="p-2 bg-orange-500 text-black">{Token ? `${Token}` : "no token"}</h2>

            {Verified && (
                <div>
                    <h2 className="text-2xl">Email Verified</h2>
                    <Link href="/login">
                        Login
                    </Link>
                </div>
            )}
            {Error && (
                <div>
                    <h2 className="text-2xl bg-red-500 text-black">Error</h2>
                </div>
            )}
        </div>
    )
}