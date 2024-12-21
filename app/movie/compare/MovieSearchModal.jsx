"use client"
import { useState, useEffect } from "react"
import useTrendingMovies from "./useTrendingMovies"
import Image from "next/image"
import debounce from "@/lib/debounce"

export default function MovieSearchModal({data, selectMovie, close}) {
const [searchedText, setSearchedText] = useState('')

const [searchInfo, setSearchInfo] = useState({
                                                searchedText:'',
                                                isLoading:false,
                                                isError:false,
                                                data:[],
                                                error:null
                                            })

async function fetchSearch(query) {
    try {
        setSearchInfo(prev => ({...prev, isLoading:true}))
        const res = await fetch(process.env.BASE_URL+ `/api/movies/search?query=${encodeURIComponent(query)}`);
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const resJson = await res.json();
        setSearchInfo(prev => ({                ...prev,
                                     searchedText: query,
                                        isLoading: false,
                                          isError: false,
                                             data: resJson.results,
                                            error: null,
                                }));
    } catch (error) {
        
    }
}


function handleSearchBoxChange(event){
    const searchedText = String(event.target.value).trim()
    setSearchedText(searchedText)
    if(searchedText.length > 0){
        fetchSearch(searchedText)
    }
}

const renderItem = ({id,  backdrop_path,title, release_date })=>(
    <button onClick={()=>selectMovie(data['itemIndex'], id)} className=" w-full  hover:bg-gray-700 rounded-md flex gap-4 items-center">
        <div className="relative w-32 h-32">
            <Image alt="" className="object-cover rounded-md" src={`https://image.tmdb.org/t/p/original/${backdrop_path}`} fill/>
        </div>
        <div>
            <h3 className="text-light text-sm font-bold truncate">{title}</h3>
            <p className="text-primary text-xs">{release_date?.split('-')[0]}</p>
        </div>
    </button>
)

    

const {data: trendingMovies} = useTrendingMovies()
const onChangeHandler = debounce(handleSearchBoxChange, 1000)

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div className="bg-zinc-900 p-6 rounded-lg w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Search Movie</h2>
          <button onClick={()=>close()} className="text-gray-400 hover:text-white">✕</button>
        </div>
        <input  onChange={onChangeHandler}
                type="text"
                placeholder="Type movie name..."
                className="w-full bg-zinc-800 text-white px-4 py-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
        <div className="max-h-96 overflow-y-auto space-y-2">
                {
                    searchedText.length > 0
                        ?   <>
                                <div className="mx-auto w-fit"> {`search result for "${searchedText}"`} </div>
                                {
                                    searchInfo.data.length > 0
                                        ? searchInfo.data.map(renderItem)
                                        : <div>sorry, nothing found </div>
                                }
                            </>                            
                        :   <>
                                <div className="mx-auto w-fit"> trending movie list </div>
                                {
                                    trendingMovies.map(renderItem)
                                }
                            </> 
                }
        </div>
      </div>
    </div>
  )
}
