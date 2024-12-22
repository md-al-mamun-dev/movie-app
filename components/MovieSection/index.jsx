import MovieCard from "./MovieCard";
import getMovies from "@/lib/api/getHomePageMovies";

export default async function MovieSection({ title, id, fetchCategory}) {
  const movies = await getMovies(fetchCategory)
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