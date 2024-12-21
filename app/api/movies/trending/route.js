import fetchWithMovieDbAuth from "@/lib/fetchWithMovieDbAuth";

export async function GET(request) {
    const url = 'https://api.themoviedb.org/3/trending/movie/week?language=en-US'
    const res = await fetchWithMovieDbAuth(url)
    const resJson =  await res.json()
    return new Response(JSON.stringify(resJson), {
      headers: { 'Content-Type': 'application/json' },
    });
  }