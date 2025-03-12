import {useEffect, useState} from "react";

function useWindowWidth() {
    const [windowSize, setWindowSize] = useState(0);
    useEffect(() => {
        function handleResize() {
            setWindowSize(window.innerWidth);
        }

        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return windowSize;
}

export default useWindowWidth;