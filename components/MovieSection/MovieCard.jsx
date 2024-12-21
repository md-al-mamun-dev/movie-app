
import Image from "next/image"
import Link from "next/link"

export default function MovieCard({data}) {
    const { backdrop_path, id, release_date , title, original_title } = data 

    return (
        
            <div className="flex-shrink-0 w-48 cursor-pointer hover:scale-105 transition-transform">
                <Link href={`/movie/${id}`}>
                    <div className="relative w-full h-72 rounded-lg overflow-hidden">
                        <Image 
                            src={`https://image.tmdb.org/t/p/w780${backdrop_path}`}
                            alt={original_title}
                            className=" object-cover"
                            fill
                            />
                    </div>
                    <div className="mt-2">
                    <h3 className="text-light text-sm font-bold truncate">{title}</h3>
                    <p className="text-primary text-xs">{release_date.split('-')[0]}</p>
                    </div>
                </Link>
            </div>
        
        
    )
}
