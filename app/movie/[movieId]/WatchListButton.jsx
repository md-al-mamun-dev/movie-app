"use client"
import { useAuth } from "@/context/auth/context"
import useWatchLater from "@/app/user/watchLater/useWatchLater"
import { useRouter } from "next/navigation"

export default function WatchListButton({ movieId }) {
    const { isLoggedIn } = useAuth()
    const router = useRouter()
    const {data: watchLaterList, setInfo } = useWatchLater()
    const hasOnwatchList = watchLaterList.some(item => item.movieId == movieId)



    async function addToWatchList(id) {
        if(!isLoggedIn){
            router.push('/user/login')
        }
        setInfo(prev => ({ ...prev, data: [...prev['data'], {movieId:id }] }))
        try {            
            const res = await fetch(`${process.env.BASE_URL}/api/me/watch-later`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ movieId: id }),
            });
      
            const result = await res.json();
      
            if (res.success) {
                
            //   refetch()
                // alert("movie removed from watch later list")
            } else {
      
            }
        } catch (error) {
            setInfo(prev => ({ ...prev, data: [...prev['data'].filter(item => item.movieId !=id )] }))
            alert("Error remove form :", error);
        }
    }
  return (
            <div className="mb-6">
                <div className="flex flex-wrap gap-4">
                    <div className="text-center">
                        {
                            isLoggedIn 
                                ? hasOnwatchList
                                    ?   <div className="flex items-center gap-2 bg-black/40 px-4 py-2 rounded-lg text-green-600">
                                            <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            // stroke-width="2"
                                            strokeWidth="2"
                                            // stroke-linecap="round"
                                            strokeLinecap="round"
                                            // stroke-linejoin="round"
                                            strokeLinejoin="round"
                    
                                            className="icon icon-tabler icons-tabler-outline icon-tabler-checks"
                                            >
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <path d="M7 12l5 5l10 -10" />
                                            <path d="M2 12l5 5m5 -5l5 -5" />
                                            </svg>
                                            Added to Wacth List
                                        </div>
                                    : <button onClick={()=>addToWatchList(movieId)}
                                    className="flex items-center gap-2 bg-black/40 px-4 py-2 rounded-lg">
                                        <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        // stroke-width="2"
                                        strokeWidth="2"
            
                                        // stroke-linecap="round"
                                        strokeLinecap="round"
                                        // stroke-linejoin="round"
                                        strokeLinejoin="round"
            
                                        className="icon icon-tabler icons-tabler-outline icon-tabler-file-plus"
                                        >
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                                        <path
                                            d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z"
                                        />
                                        <path d="M12 11l0 6" />
                                        <path d="M9 14l6 0" />
                                        </svg>
                                        Add to Wacth List
                                    </button>
                                : <button onClick={()=>addToWatchList(movieId)}
                                        className="flex items-center gap-2 bg-black/40 px-4 py-2 rounded-lg">
                                            <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            // stroke-width="2"
                                            strokeWidth="2"
                
                                            // stroke-linecap="round"
                                            strokeLinecap="round"
                                            // stroke-linejoin="round"
                                            strokeLinejoin="round"
                
                                            className="icon icon-tabler icons-tabler-outline icon-tabler-file-plus"
                                            >
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                                            <path
                                                d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z"
                                            />
                                            <path d="M12 11l0 6" />
                                            <path d="M9 14l6 0" />
                                            </svg>
                                            Add to Wacth List
                                        </button>
                        }


                        {/* <button onClick={()=>addToWatchList(movieId)}
                            className="flex items-center gap-2 bg-black/40 px-4 py-2 rounded-lg"
                        >
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            // stroke-width="2"
                            strokeWidth="2"

                            // stroke-linecap="round"
                            strokeLinecap="round"
                            // stroke-linejoin="round"
                            strokeLinejoin="round"

                            className="icon icon-tabler icons-tabler-outline icon-tabler-file-plus"
                            >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                            <path
                                d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z"
                            />
                            <path d="M12 11l0 6" />
                            <path d="M9 14l6 0" />
                            </svg>
                            Add to Wacth List
                        </button> */}

                    </div>

                    {/* <div className="text-center"> */}
                    {/* <button className="flex items-center gap-2 bg-black/40 px-4 py-2 rounded-lg text-green-600">
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        // stroke-width="2"
                        strokeWidth="2"
                        // stroke-linecap="round"
                        strokeLinecap="round"
                        // stroke-linejoin="round"
                        strokeLinejoin="round"

                        className="icon icon-tabler icons-tabler-outline icon-tabler-checks"
                        >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M7 12l5 5l10 -10" />
                        <path d="M2 12l5 5m5 -5l5 -5" />
                        </svg>
                        Added to Wacth List
                    </button> */}
                    {/* </div> */}
                </div>
            </div>
        )
}
