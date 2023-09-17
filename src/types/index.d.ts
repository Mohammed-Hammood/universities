type IconsNames = "sun-solid" | "moon-solid" | "house-solid" | "sort-down-solid" | "sort-up-solid" | "xmark-solid" | "search" | "plus-solid" | "pen-to-square-solid" | "trash-solid" | "magnifying-glass-solid";


type Status = "Waiting" | "Completed" | "In process";

type FormsNames = "search" | "university-details";

type ButtonShapes = "transparent" | "outline" | "filled";


type University = {
    id: number;
    name: string;
    country: string;
    web_pages: string[];
    alpha_two_code: string;
    "state-province": string;
    domains: string[];
}

type UniversityContextProps = {
    universities: University[];
    setUniversities: (value: University[]) => void;
    activeUniversity: University | null;
    setActiveUniversity: (value: University) => void;
    total:number;
    setTotal:(value:number)=> void;
}
type ThemeContextProps = {
    theme: "dark" | "light";
    themeToggle: () => void;
}

type Filters = {
    query:string;
    limit:number;
    skip:number;
    country:string;
    order: "id" | "-id";
}

type FiltersContextProps = {
    filters: Filters;
    setFilters: (value: {query:string, skip:number, limit:number, country:string, order: "id" | "-id"})=> void;
}