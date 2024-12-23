import React from 'react'

export default function loading() {
    return (
        <main className="container mx-auto px-4 pt-24 pb-8">
          {/* Search Stats Skeleton */}
          <div className="mb-6 animate-pulse">
            <div className="h-8 bg-gray-400 rounded w-1/2 mb-2"></div> {/* Title Skeleton */}
            <div className="h-4 bg-gray-400 rounded w-1/4"></div> {/* Subtitle Skeleton */}
          </div>
    
          {/* Filters and Sort Section Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Movie Card 1 Skeleton */}
            <div className="bg-zinc-900 rounded-lg overflow-hidden hover:scale-105 transition-transform animate-pulse">
              <div className="w-full aspect-[2/3] bg-gray-400"></div> {/* Image Skeleton */}
              <div className="p-4">
                <div className="h-6 bg-gray-400 rounded mb-2"></div> {/* Title Skeleton */}
                <div className="flex justify-between text-sm text-gray-400">
                  <div className="h-4 bg-gray-400 rounded w-1/4"></div> {/* Year Skeleton */}
                  <div className="h-4 bg-gray-400 rounded w-1/4"></div> {/* Rating Skeleton */}
                </div>
              </div>
            </div>
    
            {/* Movie Card 2 Skeleton */}
            <div className="bg-zinc-900 rounded-lg overflow-hidden hover:scale-105 transition-transform animate-pulse">
              <div className="w-full aspect-[2/3] bg-gray-400"></div> {/* Image Skeleton */}
              <div className="p-4">
                <div className="h-6 bg-gray-400 rounded mb-2"></div> {/* Title Skeleton */}
                <div className="flex justify-between text-sm text-gray-400">
                  <div className="h-4 bg-gray-400 rounded w-1/4"></div> {/* Year Skeleton */}
                  <div className="h-4 bg-gray-400 rounded w-1/4"></div> {/* Rating Skeleton */}
                </div>
              </div>
            </div>
    
            {/* Movie Card 3 Skeleton */}
            <div className="bg-zinc-900 rounded-lg overflow-hidden hover:scale-105 transition-transform animate-pulse">
              <div className="w-full aspect-[2/3] bg-gray-400"></div> {/* Image Skeleton */}
              <div className="p-4">
                <div className="h-6 bg-gray-400 rounded mb-2"></div> {/* Title Skeleton */}
                <div className="flex justify-between text-sm text-gray-400">
                  <div className="h-4 bg-gray-400 rounded w-1/4"></div> {/* Year Skeleton */}
                  <div className="h-4 bg-gray-400 rounded w-1/4"></div> {/* Rating Skeleton */}
                </div>
              </div>
            </div>
    
            {/* Additional Dummy Cards */}
            {/* You can add more skeleton cards here by duplicating the code above */}
          </div>
        </main>
      );
}
