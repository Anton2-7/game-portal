import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTopButton() {
    const location = useLocation();
    const [visible, setVisible] = useState(false);
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

    // Кнопка вверх после 400px прокрутки
    useEffect(() => {
        const handleScroll = () => {
            setVisible(window.scrollY > 400);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        setTimeout(() => {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: isIOS ? "auto" : "smooth",
            });
        }, 50);
    }, [location]);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: isIOS ? "auto" : "smooth",
        });
    };

    return (
        <button
            className={`scroll-top-btn ${visible ? "visible" : ""}`}
            onClick={scrollToTop}
            aria-label="Прокрутить страницу вверх"
            title="Наверх"
        >
            <svg viewBox="0 0 24 24">
                <path d="M12 4l-8 8h6v8h4v-8h6z" />
            </svg>
        </button>
    );
}

export { ScrollToTopButton };
