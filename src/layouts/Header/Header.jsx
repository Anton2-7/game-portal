import { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import "./style.css";
import SoldierIcon from "../../images/soldier.png";
import flag from "../../images/flag.gif";

function Header() {
  const location = useLocation();

  const burgerRef = useRef(null);
  const menuRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(max-width: 992px)").matches;
  });

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 992px)");

    const handleMediaChange = (e) => {
      setIsMobile(e.matches);
      if (!e.matches) {
        setIsOpen(false);
      }
    };

    const handleClickOutside = (event) => {
      if (
        !isOpen ||
        !isMobile ||
        !menuRef.current ||
        menuRef.current.contains(event.target) ||
        burgerRef.current?.contains(event.target)
      ) {
        return;
      }

      setIsOpen(false);
    };

    mediaQuery.addEventListener("change", handleMediaChange);
    document.addEventListener("click", handleClickOutside);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaChange);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen, isMobile]);

  return (
    <nav className="red darken-4">
      <div className="container">
        <div className="nav-wrapper">
          <div className="logo-wrapper">
            <button
              ref={burgerRef}
              className={`burger ${isOpen ? "open" : ""}`}
              onClick={(e) => {
                e.stopPropagation();
                toggleMenu();
              }}
              aria-label={isOpen ? "Закрыть меню" : "Открыть меню"}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            />

            {location.pathname !== "/" && isMobile ? (
              <img src={flag} alt="flag" className="flag-img" />
            ) : (
              <img src={SoldierIcon} alt="logo" className="logo-img" />
            )}

            <Link to="/" className="brand-logo">
              Игровой Portal
            </Link>
          </div>

          <ul className="menu-list">
            <li>
              <Link to="/" className="menu-list__item">игры</Link>
            </li>
            <li>
              <Link to="/platforms" className="menu-list__item">платформы</Link>
            </li>
          </ul>
        </div>

        <div
          id="mobile-menu"
          ref={menuRef}
          className={`burger-menu ${isOpen && isMobile ? "active" : ""}`}
          inert={!isOpen || !isMobile}
        >

          <ul className="burger-list">
            <li>
              <Link to="/" onClick={() => setIsOpen(false)} className="burger-list__item">
                игры
              </Link>
            </li>
            <li>
              <Link to="/platforms" onClick={() => setIsOpen(false)} className="burger-list__item">
                платформы
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav >
  );
}

export { Header };
