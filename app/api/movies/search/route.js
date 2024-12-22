import fetchWithMovieDbAuth from "@/lib/api/fetchWithMovieDbAuth";

export async function GET(request) {
    const query = request?.nextUrl?.searchParams.get('query');
    const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&language=en-US&page=1`
    const res = await fetchWithMovieDbAuth(url)
    const resJson =  await res.json()
    return new Response(JSON.stringify(resJson), {
      headers: { 'Content-Type': 'application/json' },
    });
  }