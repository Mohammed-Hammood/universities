import { Button } from "@/components";
import { FiltersContext, UinversityContext } from "@/context";
import { useContext, useState } from "react";

type Props = {
    close: () => void;
}

const SearchForm = ({ close }: Props) => {
    const {filters, setFilters } = useContext(FiltersContext);
    const {setUniversities} = useContext(UinversityContext);
    const [query, setQuery] = useState<string>(filters.query);

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (query.trim().length > 0){
            setUniversities([]);
            setFilters({...filters, query, skip: 0});
            close();
        }
    }

    const reset = (): void => {
        setQuery("");

        if(filters.query.trim().length > 0){
            setFilters({...filters, query:"", skip:0});
            setUniversities([]);
        }
        
        close();
    }

    return (
        <form onSubmit={submitHandler}>
            <div className='search-container' id='search-container'>
                <input
                    type={"text"}
                    value={query}
                    placeholder='Search the name'
                    onInput={e => setQuery(((e.target as HTMLInputElement).value))}
                />
            </div>
            <div className='buttons'>
                <Button type='submit' shape={"filled"} bg={"primary"} radius>
                    Search
                </Button>
                <Button type='button' shape={"outline"} radius onClick={reset}>
                    Clear
                </Button>
            </div>
        </form>
    )
}

export default SearchForm;