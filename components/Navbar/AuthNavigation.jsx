"use client"
import Link from "next/link"
import { useAuth } from "@/context/auth/context"
import { usePathname } from "next/navigation"

export default function AuthNavigation() {

    const pathname  = usePathname()
    console.log(pathname.split('/')[pathname.split('/').length-1])



    const {isLoggedIn, setUser} = useAuth()
    console.log(isLoggedIn)

    async function handleLogout() {
        try {

            // `${process.env.BASE_URL}/api/auth/logout`, 

            const response = await fetch( `${process.env.BASE_URL}/api/auth/logout`, 
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                    });

            const data  = await response.json()
            console.log(response)
            console.log(data)
            if(data.success){
                setUser(null)
            }
        } catch (error) {
            
        }
    }


  return (
    isLoggedIn 
        ? <button onClick={()=>handleLogout()} className="text-white hover:text-gray-300">
            logout
            </button>

        :   pathname.endsWith('/user/login')
                ?  <Link href="/user/register" className="text-white hover:text-gray-300">
                        register
                    </Link>
                : pathname.endsWith('/user/register')
                    ?   <Link href="/user/login" className="text-white hover:text-gray-300">
                            login
                        </Link>
                    :   <>
                            <Link href="/user/login" className="text-white hover:text-gray-300">
                                login
                            </Link>
                                <span>/</span> 
                            <Link href="/user/register" className="text-white hover:text-gray-300">
                                register
                            </Link>
                        </>
        
        
  )
}
