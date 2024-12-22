import Image from "next/image"
import formatDate from "@/lib/formateDate"
import WatchListButton from "./WatchListButton";
import SocialShare from "./SocialShare";
import dynamic from "next/dynamic";
import getMovie from "@/lib/api/getMovieDetails";
import Head from "next/head";
const SimilarMoviesSection = dynamic(() => import('./SimilarMoviesSection'), {
                                                                                loading: () => <p>Loading...</p>,
                                                                                ssr: false,
                                                                              })



export async function generateMetadata({ params, searchParams }, parent) {
  // read route params
  const { movieId } = params
  const movie = await getMovie(movieId)
  console.log(movie)
  const { title, poster_path, backdrop_path, release_date, runtime, overview, genres, cast } = movie


  // fetch data
  // const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  // const post = await res.json();

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
      title: title.slice(0, 100),
      description: overview.slice(0, 100),
      openGraph: {
          images: [
              {
                  url: `https://image.tmdb.org/t/p/original/${poster_path}`,
                  width: 1200,
                  height: 600,
              },
          ],
      },
  };
}

export default async function page({params}) {
    const { movieId } = params
    const movie = await getMovie(movieId)
    const { title, poster_path, backdrop_path, release_date, runtime, overview, genres, cast } = movie


    // const siteUrl = process.env.BASE_URL;
    // const pageUrl = `${siteUrl}/movie/${movieId}`;
    // const imageUrl = `https://image.tmdb.org/t/p/original/${poster_path}`;
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
              <WatchListButton movieId={movieId}/>
              <SocialShare/>
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
