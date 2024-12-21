
import FilterSortSection from "./FilterSortSection"

async function getMovieSearchResult(query){
    "use server"
    const res = await fetch(process.env.BASE_URL+ `/api/movies/search?query=${encodeURIComponent(query)}`)
    const resJson =  await res.json()
    return resJson
  }


export default async function page({params, searchParams}) {
    const searchText = searchParams?.query
    const res  = await getMovieSearchResult(searchText)
    const result  = res?.results

  return (
    <main class="container mx-auto px-4 pt-24 pb-8">
      {/* <!-- Search Stats --> */}
      <div class="mb-6">
        <h1 class="text-2xl font-bold">{"Search Results for " +'"'+ searchText+'"'}</h1>
        <p class="text-gray-400">{`Found ${result?.length} results`}</p>
      </div>

      {/* <!-- Filters and Sort Section --> */}
      {
        result?.length > 0
        &&  <FilterSortSection data={result}/>
      }
     
    </main>
  )
}
