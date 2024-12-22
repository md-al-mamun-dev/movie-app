"use client"
import MovieCard from "./MovieCard"
import useSimilarMovies from "./useSimilarMovies"

export default function SimilarMoviesSection({movieId}) {
  const { data:{results} }  = useSimilarMovies(movieId)
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">More Like This</h2>
      <div className="flex space-x-4 overflow-x-auto pb-4">
        {
          results?.map(({title, backdrop_path, id}) => <MovieCard key={id}  title={title} image={backdrop_path}  id={id}/>)
        }
      </div>
    </div>
  )
}
