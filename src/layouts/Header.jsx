import { useEffect, useState } from "react";
import { Search } from "../components/Search";
import SoldierIcon from "../images/soldier.png";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import flag from "../images/flag.gif"
import { useRef } from "react";

function Header(props) {



  const [isOpen, setOpen] = useState(false);
  const menuRef = useRef(null); // вернет DOM-элемент | устанавливает понимание где был совершен клик (внутри или снаружи меню)



  useEffect(() => {

    const handleCloseMenu = (event) => {

      if (!menuRef.current) return;       // Защита от ошибки на случай, если menuRef.current ещё не монитрован


      if (!menuRef.current.contains(event.target)) {        // contains вернет target (true → если target внутри menuRef) (false → если клик снаружи)

        setOpen(false);
      }
    }

    window.addEventListener('click', handleCloseMenu);
    return () => {
      window.removeEventListener('click', handleCloseMenu);
    }
  }, []);


  const toggleMenu = () => {
    setOpen((prev) => !prev);
  };

  const isMobile = window.innerWidth <= 768;


  const location = useLocation();




  return (
    <>
      <nav className="red darken-4" >
        <div className="container">
          <div className="nav-wrapper">
            <div className="logo-wrapper">
              <button
                className={`burger ${isOpen ? "open" : ""}`}
                onClick={toggleMenu}
                aria-label="Открыть меню"
                ref={menuRef}
              ></button>
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
              <Search onSearch={props.onSearch} location={location} />
              <li><Link to="/"><i className="material-icons">игры</i></Link></li>
              <li><Link to="/platforms"><i className="material-icons">платформы</i></Link></li>
            </ul>
          </div>

          <div className={`burger-menu ${isOpen ? "active" : ""} red darken-4`} >
            <ul className="burger-list">
              <li><Link to="/"><i className="material-icons">игры</i></Link></li>
              <li><Link to="/platforms"><i className="material-icons">платформы</i></Link></li>
            </ul>
          </div>
        </div>
      </nav >
    </>
  );
}

export { Header };
