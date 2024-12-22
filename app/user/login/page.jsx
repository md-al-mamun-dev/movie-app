"use client"
import Link from "next/link"
import { useState } from "react"
import { useAuth } from "@/context/auth/context"
import { useRouter } from "next/navigation"

export default function page() {
    const router = useRouter()
    const { user,
            isLoggedIn,
            isLoading,
            setUser } = useAuth()

    async function onFormSubmit(event) {
        event.preventDefault()
        const formData = new FormData(event.target)
        const email = formData.get("email")
        const password = formData.get("password")
        const payload = {
                        email,
                        password
                    };
        console.log(payload)
        try {
            // const response = await fetch(`/api/auth/login`, {
            const response = await fetch(`${process.env.BASE_URL}/api/auth/login`, {            
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            const data  = await response.json()
            console.log(response)
            console.log(data)
            if(data.success){
                setUser(data?.user)
                router.push('/')
            }
        } catch (error) {
            
        }
      }

  return (
    <div className="bg-moviedb-black min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md bg-black/70 rounded-lg p-8 shadow-xl">
        <div className="text-center mb-6">
            <h1 className="text-white text-3xl font-bold mb-4">Sign In</h1>

            <form onSubmit={onFormSubmit} id="loginForm" className="space-y-4">
                <input
                    type="email"
                    name="email"
                    placeholder="Email or phone number"
                    className="w-full p-3 bg-moviedb-gray text-black rounded focus:outline-none focus:ring-2 focus:ring-moviedb-red"
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="w-full p-3 bg-moviedb-gray text-black rounded focus:outline-none focus:ring-2 focus:ring-moviedb-red"
                    required
                />
                <button
                    type="submit"
                    className="w-full bg-moviedb-red text-white py-3 rounded hover:bg-red-700 transition duration-300"
                >
                    Sign In
                </button>
            </form>

            <div className="mt-4 flex justify-between text-moviedb-gray text-sm">
            <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Remember me
            </label>
            <Link href="#" className="hover:underline">Need help?</Link>
            </div>

            <div className="mt-6 text-moviedb-gray">
            New to moviedb?
            <a href="#" className="text-white hover:underline">Sign up now</a>
            </div>
        </div>
        </div>
    </div>
  )
}
