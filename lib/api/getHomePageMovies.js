import fetchWithAuth from "./fetchWithMovieDbAuth"

export default async function getMovies(category){
    "use server"
    const url = category === "top_rated" 
                    ? "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1"
                    : category === "popular"
                      ? "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1"
                      : category === "trending"
                        ? "https://api.themoviedb.org/3/trending/movie/week?language=en-US"
                        : ""
    const res = await fetchWithAuth(url)
    const resJson =  await res.json()
    return resJson.results
}