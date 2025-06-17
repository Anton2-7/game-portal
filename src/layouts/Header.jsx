import { useState } from "react";
import { Search } from "../components/Search";
import SoldierIcon from "../images/soldier.png";

function Header() {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <nav className="red darken-4">
        <div className="nav-wrapper">
          <div className="logo-wrapper">
            <img className="soldierIcn" src={SoldierIcon} alt="Солдат" />
            <a href="#!" className="brand-logo">
              Игровой Portal
            </a>
          </div>

          <input
            type="checkbox"
            id="burger-checkbox"
            className="burger-checkbox"
          />
          <label
            className="burger"
            htmlFor="burger-checkbox"
            onClick={() => setOpen(!isOpen)}
          ></label>
          <Search />
          <ul className="right hide-on-med-and-down">
            <li>
              <a href="sass.html">
                <i className="material-icons">новости</i>
              </a>
            </li>
            <li>
              <a href="badges.html">
                <i className="material-icons">обзоры</i>
              </a>
            </li>
            <li>
              <a href="collapsible.html">
                <i className="material-icons">статьи</i>
              </a>
            </li>
          </ul>
        </div>
        <div className={`burger-menu ${isOpen ? "active" : ""} red darken-4 `}>
          <ul className="burger-list">
            <li>
              <a href="sass.html">
                <i className="material-icons">новости</i>
              </a>
            </li>
            <li>
              <a href="badges.html">
                <i className="material-icons">обзоры</i>
              </a>
            </li>
            <li>
              <a href="collapsible.html">
                <i className="material-icons">статьи</i>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export { Header };
