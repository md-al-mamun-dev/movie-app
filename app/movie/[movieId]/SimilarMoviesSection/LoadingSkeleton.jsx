"use client"

export default function LoadingSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Section Title Skeleton */}
      <div className="text-2xl font-bold mb-4 w-32 h-6 bg-gray-300 rounded-md animate-pulse"></div>

      {/* Skeleton for Movie Cards */}
      <div className="flex space-x-4 overflow-x-auto pb-4">
        {Array(6)
          .fill()
          .map((_, index) => (
            <div
              key={index}
              className="flex w-48 h-[288px] rounded-lg cursor-pointer"
            >
              <div className="w-48 h-[288px] bg-zinc-800 relative">
                <div className="absolute inset-0 w-full h-full rounded-lg overflow-hidden">
                  <div className="animate-pulse w-full h-full bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-900 bg-[length:200%_100%] animate-[shimmer_.5s_infinite]"></div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}
