import { useState, useEffect } from "react";

export default function useMovieDetails(id) {
    const baseUrl = process.env.BASE_URL;
    const url = `${baseUrl}/api/movie/${id}`;

    const [info, setInfo] = useState({
        isLoading: false,
        isError: false,
        data: [],
        error: null,
    });

    const fetchData = async (signal) => {
        setInfo((prev) => ({ ...prev, isLoading: true, isError: false, error: null }));
        try {
            const res = await fetch(url, { signal });
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const resJson = await res.json();
            console.log(resJson)
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
    }, [url]);

    const refetch = () => {
        const controller = new AbortController();
        fetchData(controller.signal);
    };

    return { ...info, refetch };
}