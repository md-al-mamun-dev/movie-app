import useMovieDetails from './useMovieDetails'
import Image from 'next/image'

export default function CardItem({data, refetch, setInfo}) {
  const { data:movieDetails } = useMovieDetails(data.movieId)
  const {poster_path, backdrop_path, title, release_date  }  = movieDetails 

  async function removeButtonClickHandlar(id) {
    const prevData = data
    setInfo(prev => ({ ...prev, data: [...prev['data'].filter(item => item.movieId != id )] }))
    try {
      const res = await fetch(`${process.env.BASE_URL}/api/me/watch-later`, {
          method: "DELETE",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({ movieId:id }),
      });
      const result = await res.json();

  } catch (error) {
    setInfo(prev => !prev.some(item => item.movieId === id) ? [...prev, {...data}] : prev)
    alert("Error remove form :", error);
  }
  }
  return (
    
        <div className="bg-moviedb-black rounded-lg overflow-hidden shadow-lg group relative">
          {/* <Link href={`/movie/${data.movieId}`}> */}
            <div className='w-full h-[450px] relative'>
                {
                  backdrop_path
                    ? <Image
                          fill
                        src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
                        alt={title}
                        className=" object-cover"
                      />
                    : poster_path
                      ? <Image
                            fill
                            src={`https://image.tmdb.org/t/p/original/${poster_path}`}
                            alt={title}
                            className=" object-cover"
                          />
                      : <>{title}</>

                }
            </div>
          {/* </Link> */}
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
