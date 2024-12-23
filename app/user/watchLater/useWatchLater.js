import { useState, useEffect, useCallback } from "react";
import { useWatchListStore } from "@/context/watchList/context";

export default function useWatchLater() {
    const baseUrl = process.env.BASE_URL; // Use a NEXT_PUBLIC_ prefix for client-side env variables
    const url = `${baseUrl}/api/me/watch-later`;

    const { info, setInfo } = useWatchListStore();

    const fetchData = useCallback(async (signal) => { 
        // Use useCallback to memoize fetchData
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
                data: resJson?.watchLaterList || resJson,
                error: null,
            });
        } catch (error) {
            if (signal?.aborted) {

                return;
            }
            setInfo({
                isLoading: false,
                isError: true,
                data: [],
                error,
            });
        }
    }, [url]); // Include url as a dependency for fetchData

    useEffect(() => {
        const controller = new AbortController();
        fetchData(controller.signal);

        return () => {
            controller.abort();
        };
    }, []); // Only depend on the memoized fetchData function

    const refetch = useCallback(() => {
        const controller = new AbortController();
        fetchData(controller.signal);
    }, [fetchData]); // Include fetchData as a dependency for refetch

    return { ...info, setInfo, refetch };
}