import Hero from "@/components/Hero";
import MovieSection from "@/components/MovieSection";

export default function Home() {
const movieSections = [
                        {
                          id    : "trendingMovies",
                          title : "Trending Now",
                          path  : "/trending"
                        },
                        {
                          id    : "popularMovies",
                          title : "Popular on MOVIE DB",
                          path  : "/popular"
                        },
                        {
                          id    : "topRatedMovies",
                          title : "Top Rated",
                          path  : "/top-rated"
                        }
                      ]

  return (
    <>
      <Hero/>

      {/* Movie Sections */}
      <div className="container mx-auto px-4 py-8">
        {
          movieSections
            .map(
              ({id, title, path}, idx) => 
                <MovieSection 
                    key={id+'-'+idx}
                    id={id} 
                    title={title} 
                    path={path}/>)
        }
        {/* <MovieSection 
          id="trendingMovies"
          title="Trending Now"
          path="/trending"
          />
        <MovieSection 
          id="popularMovies"
          title="Popular on MOVIE DB"
          path="/popular"
          />
        <MovieSection 
          id="topRatedMovies"
          title="Top Rated"
          path="/top-rated"
          /> */}
      </div>
    </>
  );
}
