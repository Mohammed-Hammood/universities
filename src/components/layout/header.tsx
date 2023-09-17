import { Modal, ICON, Button } from "@/components";
import { FiltersContext, ThemeContext } from "@/context";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";


export const Header = (): JSX.Element => {
    const { theme, themeToggle } = useContext(ThemeContext);
    const { filters, setFilters } = useContext(FiltersContext);
    const [searchModal, setSearchModal] = useState<boolean>(false);
    const { order } = filters;

    return (
        <>
            <header className="navbar-header">
                <nav className='navbar-container'>
                    <div className='navbar-group'>
                        <Link to={"/"}>
                            <ICON name='house-solid' color='white' />
                        </Link>

                    </div>
                    <div className="navbar-group">
                        <Button
                            shape={"transparent"}
                            onClick={themeToggle}
                            title={theme === 'dark' ? "Light mode" : "Dark model"}
                            id={theme === 'dark' ? "light-mode-btn" : "dark-mode-btn"}
                        >
                            <ICON
                                name={theme === "dark" ? 'sun-solid' : 'moon-solid'}
                                color={theme === 'dark' ? 'yellow' : 'white'}
                            />
                        </Button>
                        <Button
                            shape={"transparent"}
                            title="Search"
                            onClick={() => setSearchModal(true)}
                        >
                            <ICON name='search' color='white' />
                        </Button>
                    </div>

                </nav>
            </header>
            {<Modal
                isOpen={searchModal}
                close={() => setSearchModal(false)}
                form='search'
                title={"Search"}
            />}


        </>
    )
}