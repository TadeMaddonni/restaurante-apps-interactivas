import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
    const location = useLocation();

    useEffect(() => {
        if (location.hash) {
            // Si hay un hash en la URL, desplázate a esa sección
            const element = document.querySelector(location.hash);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        } else {
            // Si no hay hash, desplázate al inicio de la página
            window.scrollTo(0, 0);
        }
    }, [location]);

    return null;
};

export default ScrollToTop;