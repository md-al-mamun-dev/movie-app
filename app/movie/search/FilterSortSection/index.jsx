import MovieCard from "./MovieCard"

export default function FilterSortSection({data}) {
  return (
    <div class="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {
            data?.map(item=><MovieCard data={item}/>)
        }
        {/* <!-- Movie Card 1 --> */}
        {/* <a href="details.html"
          class="bg-zinc-900 rounded-lg overflow-hidden hover:scale-105 transition-transform">
          <img
            src="https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg"
            alt="Avatar: The Way of Water"
            class="w-full aspect-[2/3] object-cover"
          />
          <div class="p-4">
            <h3 class="font-bold mb-2">Avatar: The Way of Water</h3>
            <div class="flex justify-between text-sm text-gray-400">
              <span>2022</span>
              <span>⭐ 7.7</span>
            </div>
          </div>
        </a> */}

        {/* <!-- Movie Card 2 --> */}
        {/* <a
          href="details.html"
          class="bg-zinc-900 rounded-lg overflow-hidden hover:scale-105 transition-transform"
        >
          <img
            src="https://image.tmdb.org/t/p/w500/jRXYjXNq0Cs2TcJjLkki24MLp7u.jpg"
            alt="Avatar"
            class="w-full aspect-[2/3] object-cover"
          />
          <div class="p-4">
            <h3 class="font-bold mb-2">Avatar</h3>
            <div class="flex justify-between text-sm text-gray-400">
              <span>2009</span>
              <span>⭐ 7.6</span>
            </div>
          </div>
        </a> */}

        {/* <!-- Movie Card 3 --> */}
        {/* <a
          href="details.html"
          class="bg-zinc-900 rounded-lg overflow-hidden hover:scale-105 transition-transform"
        >
          <img
            src="https://image.tmdb.org/t/p/w500/kSf9svfL2WrKeuK8W08xeR5lTn8.jpg"
            alt="Avatar: The Deep Dive"
            class="w-full aspect-[2/3] object-cover"
          />
          <div class="p-4">
            <h3 class="font-bold mb-2">Avatar: The Deep Dive</h3>
            <div class="flex justify-between text-sm text-gray-400">
              <span>2023</span>
              <span>⭐ 7.3</span>
            </div>
          </div>
        </a> */}

      </div>
  )
}
