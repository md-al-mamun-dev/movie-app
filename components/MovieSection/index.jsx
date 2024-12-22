import MovieCard from "./MovieCard";

async function getMovies(path){
    "use server"
    const res = await fetch(process.env.BASE_URL+ "/api/movies"+ path)
    // const res = await fetch("/api/movies"+ path)

    const resJson =  await res.json()
    return resJson.results
}

export default async function MovieSection({ title, id, path}) {
  const movies = await getMovies(path)
  return (
    <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <div id={id} className="flex space-x-4 overflow-x-auto pb-4">
          {
            movies.map(movie => <MovieCard key={movie.id} data={movie} />)
          }
        </div>
      </section>
  )
}