import fetchWithAuth from "./fetchWithMovieDbAuth"

export default async function getSearchedResult(query){
    "use server"
    const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&language=en-US&page=1`
    const res = await fetchWithAuth(url)
    const resJson =  await res.json()
    return resJson
  }