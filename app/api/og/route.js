import { ImageResponse } from 'next/og';
// App router includes @vercel/og.
// No need to install it.
 
export async function GET(request) {
  const {searchParams} = new URL(request.url)
  const hasTitle = searchParams.has('title')
  const hasImg= searchParams.has('img')
  const hasDescription= searchParams.has('description')

  const title = hasTitle 
                  ? searchParams.get('title')
                  : "movie db website"
  const img = hasImg
                  ? searchParams.get('img')
                  : ""

  const description = hasDescription
                  ? searchParams.get('description')
                  : null
  
  return new ImageResponse(
    (
      <div tw='h-full w-full flex bg-transparent items-center justify-center'>
          <div style={{
                      backgroundImage: `url(https://image.tmdb.org/t/p/w1280/${img})`,
                      backgroundSize: "scale-down",
                      backgroundPosition: "center",
                    }}
                tw=" h-full w-full flex flex-col items-left justify-end bg-white rounded-lg overflow-hidden">
              <div tw="flex flex-row  rounded-lg w-min ">
                <div tw='flex flex-col bg-gray-50 p-4 rounded-tr-lg rounded-bl-lg'>
                  <div tw="text-red-600 text-4xl font-bold">MOVIE DB</div>
                  <div>{title}</div>
                </div>
                <div tw="bg-white w-full opacity-50 p-6">
                      {description}
                </div>
              </div>
          </div>
      </div>
      
    ),
    {
      width: 1200,
      height: 600,
    },
  );
}