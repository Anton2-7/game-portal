function Header() {
  return (
    <nav className="red darken-4">
      <div className="nav-wrapper">
        <a href="#!" className="brand-logo">
          <img src="/images/soldier.jpg" alt="Солдат" />
          Logo
        </a>
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
    </nav>
  );
}

export {Header}
