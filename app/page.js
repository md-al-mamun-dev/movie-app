import Hero from "@/components/Hero";
import MovieSection from "@/components/MovieSection";

export default function Home() {
const movieSections = [
                        {
                          id    : "trendingMovies",
                          title : "Trending Now",
                 fetchCategory  : "trending"
                        },
                        {
                          id    : "popularMovies",
                          title : "Popular on MOVIE DB",
                 fetchCategory  : "popular"
                        },
                        {
                          id    : "topRatedMovies",
                          title : "Top Rated",
                 fetchCategory  : "top_rated"
                        }
                      ]

  return (
    <>
      <Hero/>
      <div className="container mx-auto px-4 py-8">
        {
          movieSections
            .map(
              ({id, title, fetchCategory}, idx) => 
                <MovieSection 
                    key={id+'-'+idx}
                    id={id} 
                    title={title} 
                    fetchCategory={fetchCategory}/>)
        }
      </div>
    </>
  );
}
