import React, { createContext, useState } from "react";


export const UinversityContext = createContext<UniversityContextProps>({
    universities: [],
    setUniversities: () => { },
    activeUniversity: null,
    setActiveUniversity: () => { },
});

export const UniversityProvider = ({ children }: { children: React.ReactNode }) => {
    const [universities, setUniversities] = useState<University[]>([]);
    const [activeUniversity, setActiveUniversity] = useState<University | null>(null);


    const value = {
        universities,
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
