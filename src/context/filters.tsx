import React, { createContext, useState } from "react";

const initialFilters: Filters = {
    order: "id",
    limit: 20,
    skip: 0,
    query: "",
    country: "all",
}

export const FiltersContext = createContext<FiltersContextProps>({
    filters: initialFilters,
    setFilters: () => { },
});

export const FiltersProvider = ({ children }: { children: React.ReactNode }) => {
    const [filters, setFilters] = useState<Filters>(initialFilters);

    return (
        <FiltersContext.Provider value={{ setFilters, filters }}>
            {children}
        </FiltersContext.Provider>
    )
}
