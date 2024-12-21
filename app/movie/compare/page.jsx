"use client"
import { useState } from "react"
import CompareItem from "./CompareItem"
import MovieSearchModal from "./MovieSearchModal"

export default function page() {
  const [movies, setMovies] = useState(
    [
      {},{}
    ]
    )
  const [modalData, setModalData] = useState({
                                              isOpen:false,
                                              itemIndex:0,  
                                            })
  function closeModal(){ setModalData({ isOpen:false, itemIndex:0 }) }
    
              
   async function fetchMovieDetails(index, id){
    try {
      const res = await fetch(process.env.BASE_URL+ `/api/movie/${id}`);
      if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
      }
      const resJson = await res.json();
      console.log(resJson)
      if(movies.length=== 0 || (movies.length === 1 && Object.keys(movies[0]).length === 0)){
        setMovies([resJson])
      }else if(movies.length > 1 && (index == (movies.length-1))){
        setMovies([...movies.slice(0, index), resJson])
      }else{
        setMovies([...movies.slice(0, index), resJson, ...movies.slice(index + 1)])
      }
      closeModal()
  } catch (error) {
      
  }
  }
  function addMovieData(index, id) {
    fetchMovieDetails(index, id)

    // if(movies.length=== 0 || (movies.length === 1 && Object.keys(movies[0]).length === 0)){
    //   setMovie([data])
    // }else if(movies.length > 1 && (index == (movies.length-1))){
    //   setMovies([...movies.slice(0, index), data])
    // }else{
    //   setMovies([...movies.slice(0, index), data, ...movies.slice(index + 1)])
    // }
  }
  return (
    <main className="container mx-auto px-4 pt-24 pb-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Compare Movies</h1>
        <button onClick={()=>setMovies([...movies, {}])} className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition-colors">
          Add Movie +
        </button>
      </div>

      {/* <!-- Movie Comparison Container --> */}
      <div className="grid gap-6 md:grid-cols-2">
        {
          movies.map((item, index)=>{
            if(Object.keys(item).length > 0){
              return <CompareItem data={item} deleteItem={()=>setMovies(prev=>[...movies.slice(0, index), ...movies.slice(index + 1)])}/>
            }

            if(Object.keys(item).length === 0){
              return <div className="bg-zinc-900 rounded-lg p-4 flex flex-col min-h-[400px]">
                      <div className="flex justify-end mb-4">
                        <button onClick={()=>setMovies(prev=>[...movies.slice(0, index), ...movies.slice(index + 1)])} className="text-gray-400 hover:text-white">✕</button>
                      </div>
                      <div className="flex-grow flex flex-col items-center justify-center">
                        <botton onClick={()=>setModalData({isOpen:true, itemIndex: index, })}
                            className="bg-zinc-800 text-white px-6 py-3 rounded hover:bg-zinc-700 transition-colors cursor-pointer">
                            Select Movie
                        </botton>
                      </div>
                    </div>
            }
          })
        }

        {/* <div className="bg-zinc-900 rounded-lg p-4 flex flex-col">
          <div className="flex justify-end mb-4">
            <button className="text-gray-400 hover:text-white"
                    onclick="removeSlot('slot-1732378356021')">
              ✕
            </button>
          </div>
          <div className="grid grid-cols-5 gap-8">
            <div className="col-span-2 h-full">
              <img
                src="https://image.tmdb.org/t/p/original/yfK7zxNL63VWfluFuoUaJj5PdNw.jpg"
                alt="Snowden"
                className="w-full rounded-lg mb-4 object-contain max-h-full"
              />
              <h2 className="text-xl font-bold mb-2 text-center">Snowden</h2>
            </div>
            <div className="w-full space-y-4 col-span-3">
              <div className="bg-zinc-800 p-3 rounded">
                <span className="text-gray-400">Rating:</span>
                <span className="float-right">7.1/10</span>
              </div>
              <div className="bg-zinc-800 p-3 rounded">
                <span className="text-gray-400">Release Year:</span>
                <span className="float-right">2016</span>
              </div>
              <div className="bg-zinc-800 p-3 rounded">
                <span className="text-gray-400">Runtime:</span>
                <span className="float-right">134 min</span>
              </div>
              <div className="bg-zinc-800 p-3 rounded">
                <span className="text-gray-400">Budget:</span>
                <span className="float-right">$40.0M</span>
              </div>
              <div className="bg-zinc-800 p-3 rounded">
                <span className="text-gray-400">Revenue:</span>
                <span className="float-right">$37.4M</span>
              </div>
              <div className="bg-zinc-800 p-3 rounded">
                <span className="text-gray-400">Genres:</span>
                <div className="mt-2 flex flex-wrap gap-2">
                  <span className="bg-zinc-700 px-2 py-1 rounded-full text-sm">
                    Drama 
                  </span>
                  <span className="bg-zinc-700 px-2 py-1 rounded-full text-sm">
                    History
                  </span>
                  <span className="bg-zinc-700 px-2 py-1 rounded-full text-sm">
                    Crime 
                  </span>
                  <span className="bg-zinc-700 px-2 py-1 rounded-full text-sm">
                    Thriller
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-zinc-900 rounded-lg p-4 flex flex-col min-h-[400px]">
          <div className="flex justify-end mb-4">
            <button className="text-gray-400 hover:text-white">✕</button>
          </div>
          <div className="flex-grow flex flex-col items-center justify-center">
            <a
              href="./search.html"
              className="bg-zinc-800 text-white px-6 py-3 rounded hover:bg-zinc-700 transition-colors cursor-pointer"
            >
              Select Movie
            </a>
          </div>
        </div>

        <div className="bg-zinc-900 rounded-lg p-4 flex flex-col min-h-[400px]">
          <div className="flex justify-end mb-4">
            <button className="text-gray-400 hover:text-white">✕</button>
          </div>
          <div className="flex-grow flex flex-col items-center justify-center">
            <a
              href="./search.html"
              className="bg-zinc-800 text-white px-6 py-3 rounded hover:bg-zinc-700 transition-colors cursor-pointer"
            >
              Select Movie
            </a>
          </div>
        </div> */}
      </div>
      {
        modalData['isOpen'] &&
        <MovieSearchModal 
          data={modalData} 
          selectMovie={fetchMovieDetails}
          close={closeModal} />
      }
    </main>
  )
}
