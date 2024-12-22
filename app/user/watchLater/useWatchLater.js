import { useState, useEffect } from "react";
import { useWatchListStore } from "@/context/watchList/context";

export default function useWatchLater() {
    const baseUrl = process.env.BASE_URL; // Use a NEXT_PUBLIC_ prefix for client-side env variables
    const url = `${baseUrl}/api/me/watch-later`;

    const {info, setInfo} = useWatchListStore()

    // const [info, setInfo] = useState({
    //     isLoading: false,
    //     isError: false,
    //     data: [],
    //     error: null,
    // });

    const fetchData = async (signal) => {
        setInfo((prev) => ({ ...prev, isLoading: true, isError: false, error: null }));
        try {
            const res = await fetch(url, { signal });
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const resJson = await res.json();
            setInfo({
                isLoading: false,
                isError: false,
                data: resJson?.watchLaterList || resJson, // Ensure results or fallback to full response
                error: null,
            });
        } catch (error) {
            if (signal?.aborted) {
                console.log("Fetch aborted");
                return;
            }
            setInfo({
                isLoading: false,
                isError: true,
                data: [],
                error,
            });
        }
    };

    useEffect(() => {
        const controller = new AbortController();
        fetchData(controller.signal);

        return () => {
            controller.abort();
        };
    }, [url, fetchData]);

    const refetch = () => {
        const controller = new AbortController();
        fetchData(controller.signal);
    };

    return { ...info, setInfo, refetch };
}