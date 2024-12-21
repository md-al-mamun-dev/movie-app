import fetchWithMovieDbAuth from "@/lib/fetchWithMovieDbAuth";

export async function GET(request) {
    const url = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1'
    const res = await fetchWithMovieDbAuth(url)
    const resJson =  await res.json()
    return new Response(JSON.stringify(resJson), {
      headers: { 'Content-Type': 'application/json' },
    });
  }