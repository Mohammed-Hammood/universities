import { Button } from "@/components";
import {  useState } from "react";

type Props = {
    close: () => void;
}

const SearchForm = ({}: Props) => {
    const [query, setQuery] = useState<string>("");
    const [result, setResult] = useState<University[]>([]);


    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // const includes = (text: string): boolean => text.toLowerCase().includes(query.toLowerCase());

        // const result = .filter(item => includes(item.name) || includes(item.description));

        setResult(result);
    }

    

    return (
        <form onSubmit={submitHandler}>
            <div className='search-container' id='search-container'>
                <input
                    type={"text"}
                    value={query}
                    placeholder='Search the name'
                    onInput={ e => setQuery(((e.target as HTMLInputElement).value))}
                />
                {result.length > 0 &&
                    <div className='search-result-container'>
                        {result.map((item) => {
                            return <button
                                className='todos'
                                key={item.id}
                            >
                                {item.name}
                            </button>
                        })}
                    </div>
                }
            </div>
            <div className='buttons'>
                <Button type='submit' shape={"filled"} bg={"primary"} radius>
                    Search
                </Button>
            </div>
        </form>
    )
}

export default SearchForm;