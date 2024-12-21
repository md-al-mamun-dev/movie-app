"use client"
import { useRouter, usePathname } from "next/navigation";
import debounce from "@/lib/debounce";

export default function SearchBox() {
    const router = useRouter()
    const pathname = usePathname();
    
    function handleSearchBoxChange(event){
        const searchText = String(event.target.value).trim()
        if(searchText.trim().length < 1 ){
            if(pathname === '/movie/search'){
                const navigations = navigation.entries()
                if(navigations.length > 2){
                    const previousUrl = navigations[navigations.length-2]?.url
                    const baseUrl = process.env.BASE_URL
                    if(previousUrl.startsWith(baseUrl)){
                        const navUrlWithoutBaseUrl = previousUrl.slice(baseUrl.length)
                        if(!navUrlWithoutBaseUrl.startsWith('/movies/search')){
                            router.push(navUrlWithoutBaseUrl)
                        }
                    }
                }
            }            
        }else if(searchText.length > 0 ){
            router.push(`/movie/search?query=${encodeURIComponent(searchText)}`)
        }
    }
    const onChangeHandler = debounce(handleSearchBoxChange, 700)

  return ( <input   onChange={onChangeHandler}
                    type="text"
                    id="searchInput"
                    placeholder="Search movies..."
                    className="bg-black bg-opacity-50 text-white px-4 py-2 rounded border border-gray-600 focus:outline-none focus:border-white"/>)
}
