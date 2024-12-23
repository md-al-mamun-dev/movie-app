import fetchWithMovieDbAuth from "@/lib/api/fetchWithMovieDbAuth";

export async function GET(request) {
    const urlParts = request.nextUrl.pathname.split('/');
    const id = urlParts[urlParts.length - 2]; 
    const url = `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`

    try {
      const res = await fetchWithMovieDbAuth(url)
      const resJson =  await res.json()
      if(resJson.hasOwnProperty('success') && resJson.success === false){
        // in case of no data found 
        return new Response(JSON.stringify({ error: 'No Data found' }), {
          status: 404});
      }else{
        return new Response(JSON.stringify(resJson), {
          headers: { 'Content-Type': 'application/json' },
        });
      }
    } catch (error) {
      // Handle unexpected errors or other issues
      return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }