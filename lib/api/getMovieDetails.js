import fetchWithAuth from "./fetchWithMovieDbAuth";

export default async function getMovie(id){
    try {
      const movieDetailsRes = await fetchWithAuth(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, { next: { revalidate: 60 } });
      if (!movieDetailsRes.ok) throw new Error("Failed to fetch movie details");
      const movieDetails = await movieDetailsRes.json();
  
      const movieCastRes = await fetchWithAuth(`https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`, { next: { revalidate: 60 } });
      if (!movieCastRes.ok) throw new Error("Failed to fetch movie cast");
  
      const { cast } = await movieCastRes.json();
  
      return { ...movieDetails, cast };
    } catch (error) {
      console.error(`Error fetching movie data for ID ${id}:`, error);
      return {
        title: "Unknown Title",
        poster_path: "",
        backdrop_path: "",
        release_date: "",
        runtime: 0,
        overview: "Data unavailable.",
        genres: [],
        cast: [],
      };
    }
  }