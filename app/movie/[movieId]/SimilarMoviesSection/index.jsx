import MovieCard from "./MovieCard"


async function getSimilar(id){
  "use server"
  const res = await fetch(process.env.BASE_URL+ "/api/movie/"+ id+"/similar", {cache: "no-store",})
  const resJson =  await res.json()
  return {...resJson, similar: resJson['results'] }
}


export default async function SimilarMoviesSection({movieId}) {
  const { similar } = await getSimilar(movieId)
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">More Like This</h2>
      <div className="flex space-x-4 overflow-x-auto pb-4">
        {
          similar?.map(({title, backdrop_path, id}) => <MovieCard key={id}  title={title} image={backdrop_path}  id={id}/>)
        }
      </div>
    </div>
  )
}
