import { useEffect, useState } from "react";

export function useFetch(url: string) {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState("");
    useEffect(
        function () {
            (() => setIsLoading(true))();
            async function fetchData() {
                try {
                    const res = await fetch(url);
                    if (!res.ok)
                        throw new Error(`${res.status}: ${res.statusText}`);
                    const newData = await res.json();
                    if (!newData) throw new Error("No Data founded!");
                    setData(newData);
                } catch (error) {
                    if (error instanceof Error) setError(error.message);
                } finally {
                    setIsLoading(false);
                }
            }
            const id = setTimeout(() => fetchData(), 500);
            return () => clearTimeout(id);
        },
        [url],
    );

    return { data, isLoading, error };
}
