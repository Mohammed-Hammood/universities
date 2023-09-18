import { useEffect, useState } from "react";
import { ICON } from "@/components";
import styles from "./styles.module.scss";
import clsx from "clsx";


export function ScrollToTop() {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [fly, setFly] = useState<boolean>(false);
    const max = 500;

    useEffect(() => {

        const handleScroll = (): void => {
            const height: number = document.body.scrollTop || document.documentElement.scrollTop;

            if (height >= max) {
                setIsVisible(true);
            }
        }

        window.onscroll = function () {
            const height: number = document.body.scrollTop || document.documentElement.scrollTop;

            if (height >= max) {
                setIsVisible(true);
            }
            else if (height < max && isVisible) {
                setIsVisible(false);
                setFly(false);
            }
        }
        window.addEventListener("scroll", handleScroll)

        return () => window.removeEventListener("scroll", handleScroll)

    }, [isVisible, setIsVisible]);

    const scrollToTopHandler = (): void => {
        setFly(true);
        
        let interval = setTimeout(() => {
            
            document.body.scrollTop = 0;  // For Safari
            
            document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
            
            clearTimeout(interval);

        }, 400);
    }

    return (
        <button
            onClick={scrollToTopHandler}
            type={'button'}
            className={clsx(styles.button, { [styles.isVisible]: isVisible, [styles.flyToTop]: fly })}
        >
            <ICON name={"plane-solid"} color="black" />
        </button>)
}