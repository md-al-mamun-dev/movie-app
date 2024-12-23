import Image from "next/image"
import Link from "next/link"

export default function MovieCard({data}) {
    const { id, poster_path, title, release_date, vote_average  } = data 
  return (
    <Link href={`/movie/${id}`}
        class="bg-zinc-900 rounded-lg overflow-hidden hover:scale-105 transition-transform">
        <div className="relative w-full aspect-[2/3]">
            <Image alt="" class="w-full aspect-[2/3] object-cover" src={`https://image.tmdb.org/t/p/w500/${poster_path}`} fill />
        </div>
        {/* <img src="https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg"
            alt="Avatar: The Way of Water"/> */}
        <div class="p-4">
        <h3 class="font-bold mb-2">{title}</h3>
        <div class="flex justify-between text-sm text-gray-400">
            <span>2022</span>
            <span>{`⭐ ` + `${ parseFloat(vote_average).toFixed(1) } `}</span>
        </div>
        </div>
    </Link>
  )
}
