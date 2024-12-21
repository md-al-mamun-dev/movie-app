import React from 'react'

async function getMovies(){
    "use server"
    const res = await fetch(process.env.BASE_URL+ "/api/me/watch-list")
    const resJson =  await res.json()
    console.log(resJson)
    return resJson.results
}

export default async function page() {

    const movies = await getMovies()
    // console.log
  return (
    <div class="container mx-auto pt-24 pb-8">
      <header class="mb-8">
        <h1 class="text-4xl font-bold text-white">Watch Later</h1>
        <p class="text-light/70 mt-2">
          Movies you've saved to watch in the future
        </p>
      </header>

      <div
        id="watchLaterList"
        class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        {/* <!-- Movie Card Template --> */}
        <div
          class="bg-moviedb-black rounded-lg overflow-hidden shadow-lg group relative"
        >
          <img
            src="https://image.tmdb.org/t/p/original/pnXLFioDeftqjlCVlRmXvIdMsdP.jpg"
            alt="Armor"
            class="w-full h-[450px] object-cover"
          />
          <div
            class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4"
          >
            <h2 class="text-xl font-bold text-light mb-2">Armor</h2>
            <div class="flex justify-between items-center">
              <span class="text-primary">2010</span>
              <button
                class="bg-moviedb-red text-light px-3 py-1 rounded-full hover:bg-moviedb-red/80 transition"
              >
                Remove
              </button>
            </div>
          </div>
        </div>

        <div
          class="bg-moviedb-black rounded-lg overflow-hidden shadow-lg group relative"
        >
          <img
            src="https://image.tmdb.org/t/p/original/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg"
            alt="Deadpool &amp; Wolverine"
            class="w-full h-[450px] object-cover"
          />
          <div
            class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4"
          >
            <h2 class="text-xl font-bold text-light mb-2">
              Deadpool &amp; Wolverine
            </h2>
            <div class="flex justify-between items-center">
              <span class="text-primary">2024</span>
              <button
                class="bg-moviedb-red text-light px-3 py-1 rounded-full hover:bg-moviedb-red/80 transition"
              >
                Remove
              </button>
            </div>
          </div>
        </div>

        <div
          class="bg-moviedb-black rounded-lg overflow-hidden shadow-lg group relative"
        >
          <img
            src="https://image.tmdb.org/t/p/original/wTnV3PCVW5O92JMrFvvrRcV39RU.jpg"
            alt="Movie Poster"
            class="w-full h-[450px] object-cover"
          />
          <div
            class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4"
          >
            <h2 class="text-xl font-bold text-light mb-2">The Wild Robot</h2>
            <div class="flex justify-between items-center">
              <span class="text-primary">2014</span>
              <button
                class="bg-moviedb-red text-light px-3 py-1 rounded-full hover:bg-moviedb-red/80 transition"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>

      <div id="emptyState" class="hidden text-center py-16">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-24 w-24 mx-auto text-moviedb-gray mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
          />
        </svg>
        <h2 class="text-2xl font-bold text-light mb-2">
          Your Watch Later list is empty
        </h2>
        <p class="text-light/70 mb-6">
          Explore movies and add them to your list to watch later
        </p>
        <a
          href="#"
          class="bg-primary text-dark px-6 py-2 rounded-full hover:bg-primary/80 transition"
        >
          Explore Movies
        </a>
      </div>
    </div>
  )
}
