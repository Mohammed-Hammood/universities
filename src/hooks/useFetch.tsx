import { FiltersContext, UinversityContext } from "@/context";
import { useContext, useEffect, useState } from "react"


export const useFetch = () => {
    const { setUniversities, universities } = useContext(UinversityContext);
    const { filters } = useContext(FiltersContext);
    const [loading, setLoading] = useState<boolean>(universities.length === 0);
    const { limit, skip, query, country } = filters;

    useEffect(() => {
        const url = `https://mohammed-api.vercel.app/api/universities/?limit=${limit}&query=${query}&skip=${skip}&country=${country}`;

        const getData = async (): Promise<void> => {
            const req = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const res = await req.json();

            setUniversities(res.data);

            setLoading(false);
        }

        getData();

    }, []);


    return {
        loading,
    }
}