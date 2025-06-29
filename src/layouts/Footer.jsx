function Footer() {
  return (
    <>
      <footer className="page-footer black">
        <div className="container">
          <div className="row">
            <div className="col l6 s12">
              <h5 className="white-text">Footer Content</h5>
              <p className="grey-text text-lighten-4">
                You can use rows and columns here to organize your footer
                content.
              </p>
            </div>
            <div className="col l4 offset-l2 s12">
              <h5 className="white-text">Контакты</h5>
              <ul>
                <li>
                  <a className="grey-text text-lighten-3" href="#!">
                    Facebook
                  </a>
                </li>
                <li>
                  <a className="grey-text text-lighten-3" href="#!">
                    ВКонтакте
                  </a>
                </li>
                <li>
                  <a className="grey-text text-lighten-3" href="#!">
                    Twitter
                  </a>
                </li>
                <li>
                  <a className="grey-text text-lighten-3" href="#!">
                    Telegram
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-copyright">
          <div className="container">
            © {new Date().getFullYear()} Все права защищены
            <a className="grey-text text-lighten-4 right" href="#!">
              Больше информации
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
export {Footer}