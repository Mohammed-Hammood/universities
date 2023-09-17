import React, { createContext, useState } from "react";


export const UinversityContext = createContext<UniversityContextProps>({
    universities: [],
    setUniversities: () => { },
    activeUniversity: null,
    setActiveUniversity: () => { },
    setTotal:()=> {},
    total:0,
});

export const UniversityProvider = ({ children }: { children: React.ReactNode }) => {
    const [universities, setUniversities] = useState<University[]>([]);
    const [activeUniversity, setActiveUniversity] = useState<University | null>(null);
    const [total, setTotal] = useState<number>(0);


    const value = {
        universities,
        total,
        setTotal,
        setUniversities,
        activeUniversity,
        setActiveUniversity,
    }

    return (
        <UinversityContext.Provider value={value}>
            {children}
        </UinversityContext.Provider>
    )
}
