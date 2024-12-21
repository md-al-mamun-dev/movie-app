import Link from "next/link"
import Image from "next/image"

export default function MovieCard({title, image, id}) {
  return (
    <div className="flex-shrink-0 w-48 cursor-pointer hover:scale-105 transition-transform">
        <Link href={`/movie/${id}`}>
            <div className="relative w-full h-72 rounded-lg overflow-hidden">
            <Image
                src={`https://image.tmdb.org/t/p/original/${image}`}
                alt={title}
                className="rounded-lg object-cover"
                fill
            />
            </div>
        </Link>
    </div>
  )
}
