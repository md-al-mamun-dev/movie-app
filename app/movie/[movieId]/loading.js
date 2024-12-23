import React from 'react'

export default function loading() {
  return (
    <>
        <div id="movieDetails" className="min-h-screen pt-20 mb-8">
            <div className="relative h-screen">
            <div className="absolute inset-0">
                <div className="w-full h-full bg-gray-300 animate-pulse" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70" />
            </div>

            <div className="relative container mx-auto px-4 pt-32">
                <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/3">
                    <div className="w-full h-64 bg-gray-300 rounded-lg animate-pulse" />
                </div>

                <div className="md:w-2/3">
                    <div className="w-3/4 h-8 bg-gray-300 rounded-md mb-4 animate-pulse" />
                    <div className="flex items-center mb-4 space-x-4">
                    <div className="w-24 h-6 bg-gray-300 rounded-md animate-pulse" />
                    <span>|</span>
                    <div className="w-24 h-6 bg-gray-300 rounded-md animate-pulse" />
                    </div>

                    <div className="w-full h-16 bg-gray-300 rounded-md mb-6 animate-pulse" />

                    <div className="mb-6">
                    <h3 className="text-gray-400 mb-2 w-32 h-6 bg-gray-300 rounded-md animate-pulse" />
                    <div className="flex flex-wrap gap-2">
                        <div className="w-16 h-6 bg-gray-300 rounded-full animate-pulse" />
                        <div className="w-16 h-6 bg-gray-300 rounded-full animate-pulse" />
                    </div>
                    </div>

                    <div className="mb-6">
                    <h3 className="text-gray-400 mb-2 w-32 h-6 bg-gray-300 rounded-md animate-pulse" />
                    <div className="flex flex-wrap gap-4">
                        {Array(5).fill().map((_, index) => (
                        <div key={index} className="text-center">
                            <div className="w-24 h-24 bg-gray-300 rounded-full mb-2 animate-pulse" />
                            <div className="w-16 h-4 bg-gray-300 rounded-md animate-pulse" />
                        </div>
                        ))}
                    </div>
                    </div>

                    <div className="mb-6">
                    <div className="flex flex-wrap gap-4">
                        <div className="w-48 h-12 bg-gray-300 rounded-lg animate-pulse" />
                        <div className="w-48 h-12 bg-gray-300 rounded-lg animate-pulse" />
                    </div>
                    </div>

                    <div className="mb-6">
                    <h3 className="text-gray-400 mb-2 w-32 h-6 bg-gray-300 rounded-md animate-pulse" />
                    <div className="flex flex-wrap gap-4">
                        {Array(3).fill().map((_, index) => (
                        <div key={index} className="text-center cursor-pointer">
                            <div className="w-8 h-8 bg-gray-300 rounded-full object-cover mb-2 mx-auto animate-pulse" />
                            <div className="w-12 h-4 bg-gray-300 rounded-md animate-pulse" />
                        </div>
                        ))}
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>

        {/* Similar Movies Section */}
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-4 w-32 h-6 bg-gray-300 rounded-md animate-pulse" />
            <div className="flex space-x-4 overflow-x-auto pb-4">
            {Array(6).fill().map((_, index) => (
                <div key={index} className="flex w-48 h-[288px] rounded-lg cursor-pointer">
                <div className="w-48 h-[288px] bg-zinc-800 relative">
                    <div className="absolute inset-0 w-full h-full rounded-lg overflow-hidden">
                    <div className="animate-pulse w-full h-full bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-900 bg-[length:200%_100%] animate-[shimmer_.5s_infinite]" />
                    </div>
                </div>
                </div>
            ))}
            </div>
        </div>
    </>
    
  )
}
