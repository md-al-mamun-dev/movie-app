import Image from "next/image"
// import SimilarMoviesSection from "./SimilarMoviesSection"
import formatDate from "@/lib/formateDate"
import WatchListButton from "./WatchListButton";
import SocialShare from "./SocialShare";
import dynamic from "next/dynamic";
const SimilarMoviesSection = dynamic(() => import('./SimilarMoviesSection'), {
                                                                                loading: () => <p>Loading...</p>,
                                                                                ssr: false,
                                                                              })

async function getMovie(id){
  try {
    const movieDetailsRes = await fetch(`${process.env.BASE_URL}/api/movie/${id}`, { next: { revalidate: 60 } });
    if (!movieDetailsRes.ok) throw new Error("Failed to fetch movie details");
    const movieDetails = await movieDetailsRes.json();

    const movieCastRes = await fetch(`${process.env.BASE_URL}/api/movie/${id}/cast`, { next: { revalidate: 60 } });
    if (!movieCastRes.ok) throw new Error("Failed to fetch movie cast");

    const { cast } = await movieCastRes.json();

    return { ...movieDetails, cast };
  } catch (error) {
    console.error(`Error fetching movie data for ID ${id}:`, error);
    return {
      title: "Unknown Title",
      poster_path: "",
      backdrop_path: "",
      release_date: "",
      runtime: 0,
      overview: "Data unavailable.",
      genres: [],
      cast: [],
    };
  }
}

// async function getCast(id){
//   "use server"
//   const res = await fetch(process.env.BASE_URL+ "/api/movie/"+ id+"/cast")
//   // const res = await fetch("/api/movie/"+ id+"/cast")

//   const resJson =  await res.json()
//   return resJson
// }



export default async function page({params}) {
    const { movieId } = params
    const movie = await getMovie(movieId)
    // const { cast } = await getCast(movieId)
    const { title, poster_path, backdrop_path, release_date, runtime, overview, genres, cast } = movie

  return (
    <>
    {/* Movie Details Section  */}
    <div id="movieDetails" className="min-h-screen pt-20 mb-8">
      <div className="relative h-screen">
        <div className="absolute inset-0">
          <div className="w-full h-full">
            {
              poster_path 
                ? <Image className="object-cover" alt={title} src={`https://image.tmdb.org/t/p/original/${poster_path}`} fill/>
                : backdrop_path 
                  ? <Image className="object-cover" alt={title} src={`https://image.tmdb.org/t/p/original/${backdrop_path}`} fill/>
                  : <></>
            }
            {/* <Image className="object-cover" alt={title} src={`https://image.tmdb.org/t/p/original/${poster_path}`} fill/> */}
          </div>
          <div
            className="absolute inset-0 bg-gradient-to-t from-black via-black/70"
          ></div>
        </div>

        <div className="relative container mx-auto px-4 pt-32">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
            <div className="relative w-full h-full 2xl:h-[700px] object-cover shadow-lg">
              {
                backdrop_path 
                  ? <Image className="object-cover rounded-lg" alt={title} src={`https://image.tmdb.org/t/p/w1280/${backdrop_path}`} fill/>
                  : poster_path 
                    ? <Image className="object-cover rounded-lg" alt={title} src={`https://image.tmdb.org/t/p/w1280/${poster_path}`} fill/>
                    : <></>
              }
            </div>
            </div>

            <div className="md:w-2/3">
              <h1 className="text-4xl font-bold mb-4">{title}</h1>

              <div className="flex items-center mb-4 space-x-4">
                <span className="text-green-500">{formatDate(release_date)}</span>
                <span>| </span>
                <span>{runtime +' min'}</span>
              </div>

              <p className="text-lg mb-6">{overview}</p>

              <div className="mb-6">
                <h3 className="text-gray-400 mb-2">Genres</h3>
                <div className="flex flex-wrap gap-2">
                  {
                    genres?.map(({id, name}) =>  <span key={'genre-'+id} className="px-3 py-1 bg-gray-800 rounded-full text-sm">
                                                  {name}
                                                </span> )
                  }
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-gray-400 mb-2">Cast</h3>
                <div className="flex flex-wrap gap-4">
                  {
                    cast?.sort((a,b) => b.popularity - a.popularity)?.slice(0, 7)
                      ?.map(({profile_path, name, id}) => 
                                      <div key={id} className="text-center">
                                          <div className="relative w-24 h-24  mb-2">
                                            {
                                              profile_path
                                              && <Image className="rounded-full object-cover"
                                                src={`https://image.tmdb.org/t/p/original/${profile_path}`} alt={name} fill/>
                                            }
                                            
                                          </div>
                                          <p className="text-sm">{name}</p>
                                      </div>)
                  }

                </div>
              </div>
              <WatchListButton/>
              {/* <div className="mb-6">
                <div className="flex flex-wrap gap-4">
                  <div className="text-center">
                    <button
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
                    </button>
                  </div>

                  <div className="text-center">
                    <button
                      className="flex items-center gap-2 bg-black/40 px-4 py-2 rounded-lg text-green-600"
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

                        className="icon icon-tabler icons-tabler-outline icon-tabler-checks"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M7 12l5 5l10 -10" />
                        <path d="M2 12l5 5m5 -5l5 -5" />
                      </svg>
                      Added to Wacth List
                    </button>
                  </div>
                </div>
              </div> */}
              <SocialShare/>
              {/* <div className="mb-6">
                <h3 className="text-gray-400 mb-2">Share on social media</h3>
                <div className="flex flex-wrap gap-4">
                  <button className="text-center cursor-pointer">
                    <img
                      src="http://facebook.com/favicon.ico"
                      alt="Facebook"
                      className="w-8 h-8 rounded-full object-cover mb-2 mx-auto"
                    />
                    <p className="text-sm">Facebook</p>
                  </button>

                  <button className="text-center cursor-pointer">
                    <img
                      src="http://x.com/favicon.ico"
                      alt="Facebook"
                      className="w-8 h-8 rounded-full object-cover mb-2 mx-auto"
                    />
                    <p className="text-sm">X</p>
                  </button>

                  <button className="text-center cursor-pointer">
                    <img
                      src="http://linkedin.com/favicon.ico"
                      alt="Facebook"
                      className="w-8 h-8 rounded-full object-cover mb-2 mx-auto"
                    />
                    <p className="text-sm">Linkedin</p>
                  </button>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Similar Movies Section */} 
    <SimilarMoviesSection movieId={movieId}/>
    </>
  )
}
