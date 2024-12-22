import Image from "next/image"
import { formatFinancialValue } from "@/lib/formatFinancialValue"


export default function CompareItem({data, deleteItem}) {
    const { id, title,  poster_path, vote_average, release_date, runtime, budget, revenue, genres } = data 
    
  return (
        <div class="bg-zinc-900 rounded-lg p-4 flex flex-col">
          <div class="flex justify-end mb-4">
            <button onClick={()=>deleteItem(id)} class="text-gray-400 hover:text-white">
              ✕
            </button>
          </div>
          <div class="grid grid-cols-5 gap-8">
            <div class="col-span-2 h-full">
                <div className="w-full h-full mb-4  max-h-full relative">
                    <Image alt="" className="object-contain rounded-lg" src={`https://image.tmdb.org/t/p/original/${poster_path}`} fill/>
                </div>
              <h2 class="text-xl font-bold mb-2 text-center">{title}</h2>
            </div>
            <div class="w-full space-y-4 col-span-3">
              <div class="bg-zinc-800 p-3 rounded">
                <span class="text-gray-400">Rating:</span>
                <span class="float-right">{`${parseFloat(vote_average).toFixed(1)} /10`}</span>
              </div>
              <div class="bg-zinc-800 p-3 rounded">
                <span class="text-gray-400">Release Year:</span>
                <span class="float-right">{release_date.split('-')[0]}</span>
              </div>
              <div class="bg-zinc-800 p-3 rounded">
                <span class="text-gray-400">Runtime:</span>
                <span class="float-right">{`${runtime} min`}</span>
              </div>
              <div class="bg-zinc-800 p-3 rounded">
                <span class="text-gray-400">Budget:</span>
                <span class="float-right">{formatFinancialValue(budget)}</span>
              </div>
              <div class="bg-zinc-800 p-3 rounded">
                <span class="text-gray-400">Revenue:</span>
                <span class="float-right">{formatFinancialValue(revenue)}</span>
              </div>
              <div class="bg-zinc-800 p-3 rounded">
                <span class="text-gray-400">Genres:</span>
                <div class="mt-2 flex flex-wrap gap-2">
                    {
                        genres?.map(({ name }, index) => <span key={index} class="bg-zinc-700 px-2 py-1 rounded-full text-sm">
                        {name} 
                      </span> )
                    }
                </div>
              </div>
            </div>
          </div>
        </div>
    )
}
