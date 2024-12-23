import MovieCard from "./MovieCard"

export default function FilterSortSection({data}) {
  return (
    <div class="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {
            data?.map((item, index)=><MovieCard key={index} data={item}/>)
        }
      </div>
  )
}
