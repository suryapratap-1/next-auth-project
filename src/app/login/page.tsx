'use client';
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function Login () {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: '',
        password: '',
    })
    const [buttonDisabled, setButtonDisabled] = useState(false)
    const [loading, setLoading] = useState(false)

    const signupHandler = async () => {
        try {
            setLoading(true)
            const response = await axios.post("/api/user/login", user);
            console.log(response);
            router.push('/profile');
            toast.success('Login successfully');
        } 
        catch (error: any) {
            toast.error(error.message)
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false)
        }
        else setButtonDisabled(true);
    }, [user])

    return (
        <main className="flex flex-col gap-6 items-center mt-28">
            <h1 className="text-3xl font-semibold tracking-wide">
                { loading ? "Processing" : "Login" }
            </h1>
            <div className="flex flex-col gap-3">
                <div className="flex gap-4 items-center">
                    <label htmlFor="email">Email</label>
                    <input className=" bg-[#4d4d4d] rounded-sm p-2 focus:outline-none"
                        type="email" name="email" id="email" placeholder="Email" required 
                        value={user.email}
                        onChange={ (e) => setUser({...user, email: e.target.value })}
                    />
                </div>
                <div className="flex gap-4 items-center">
                    <label htmlFor="password">Password</label>
                    <input className=" bg-[#4d4d4d] rounded-sm p-2 focus:outline-none"
                        type="password" name="password" id="password" placeholder="Password" required 
                        value={user.password}
                        onChange={ (e) => setUser({...user, password: e.target.value })}
                    />
                </div>
                <button onClick={signupHandler} className="bg-[#252525] rounded-sm p-2 hover:bg-[#252525aa] cursor-pointer">
                    { buttonDisabled ? "No login" : "Login" }
                </button>
                <Link href='/signup'>Don't have an account? Signup here</Link>
            </div>
        </main>
    )
}