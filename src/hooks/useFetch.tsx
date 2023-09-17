import { FiltersContext, UinversityContext } from "@/context";
import { useContext, useEffect, useState } from "react"


export const useFetch = () => {
    const { setUniversities, universities, setTotal } = useContext(UinversityContext);
    const { filters } = useContext(FiltersContext);
    const [loading, setLoading] = useState<boolean>(universities.length === 0);

    useEffect(() => {
        const { limit, skip, query, country } = filters;
        const url = `https://mohammed-api.vercel.app/api/universities/?limit=${limit}&query=${query}&skip=${skip}&country=${country}`;


        const getData = async (): Promise<void> => {
            setLoading(true);
            const req = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const res = await req.json();

            setUniversities([...universities, ...res.data]);

            setTotal(res.total);
            
            setLoading(false);
        }

        getData();

    }, [filters]);


    return {
        loading,
    }
}