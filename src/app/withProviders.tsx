import React from "react";
import { BrowserRouter } from "react-router-dom";
import { UniversityProvider, ThemeProvider, FiltersProvider } from "@/context";

export const withProviders = (App: () => JSX.Element): JSX.Element => {
    return (
        <React.StrictMode>
            <BrowserRouter>
                <ThemeProvider>
                    <FiltersProvider>
                        <UniversityProvider>
                            <App />
                        </UniversityProvider>
                    </FiltersProvider>
                </ThemeProvider>
            </BrowserRouter>
        </React.StrictMode>
    );
}