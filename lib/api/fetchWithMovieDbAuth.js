export default async function fetchWithAuth(url, type ,  options = {}) {
    // Check if the URL is targeting themoviedb.org
    if (url.startsWith('https://api.themoviedb.org')) {
      const headers = {
        ...options?.headers,
        Authorization: `Bearer ${process.env.API_READ_ACCESS_TOKEN}`,
      };
  
      // Merge headers with other options
      if(type==="dynamic"){
        options = {
          ...options,
          cache: "no-store",
          headers,
        };
      }else{
        options = {
          ...options,
          headers,
        };
      }
      
    }
  
    // Perform the fetch request
    return fetch(url, options);
  }