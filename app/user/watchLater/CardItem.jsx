import React from 'react'
import useMovieDetails from './useMovieDetails'
import Link from 'next/link'
import Image from 'next/image'

export default function CardItem({data, refetch}) {
  const {data:movieDetails} = useMovieDetails(data.movieId)
  const {poster_path, backdrop_path, title, release_date  }  = movieDetails 

  async function removeButtonClickHandlar(id) {
    try {
      const res = await fetch(`${process.env.BASE_URL}/api/me/watch-later`, {
          method: "DELETE",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({ movieId:id }),
      });

      const result = await res.json();

      if (res.ok) {
        refetch()
          // alert("movie removed from watch later list")
      } else {

      }
  } catch (error) {
      alert("Error remove form :", error);

  }
  }
  return (
    
        <div className="bg-moviedb-black rounded-lg overflow-hidden shadow-lg group relative">
          <div className='w-full h-[450px] relative'>
            <Link href={`/movie/${data.movieId}`}>
              {
                backdrop_path
                  ? <Image
                      src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
                      alt={title}
                      className=" object-cover"
                    />
                  : poster_path
                    ? <Image
                          src={`https://image.tmdb.org/t/p/original/${poster_path}`}
                          alt={title}
                          className=" object-cover"
                        />
                    : <>{title}</>

              }
            </Link>
          </div>
          <div
            className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4"
          >
            <h2 className="text-xl font-bold text-light mb-2">Armor</h2>
            <div className="flex justify-between items-center">
              <span className="text-primary">2010</span>
              <button onClick={()=>removeButtonClickHandlar(data.movieId)}
                className="bg-moviedb-red text-light px-3 py-1 rounded-full hover:bg-moviedb-red/80 transition"
              >
                Remove
              </button>
            </div>
          </div>
        </div>

    
  )
}
