import React from "react";
import SearchIco from "../images/icons8-search.svg";
import CloseBtn from "../images/close_10015296.png"

class Search extends React.Component {
  state = {
    search: '',
    isOpen: false
  };

  toggleSearch = () => {
    this.setState((prevState) => ({
      isOpen: !prevState.isOpen,
      search: '' // Очистка строки поиска при закрытии 
    }));
  };

  handleChange = (e) => {
    this.setState({
      search: e.target.value
    });
  };

  render() {
    const { search, isOpen } = this.state;

    return (
      <div className="row r-search">
        <input
          id="search"
          className={`validate ${isOpen ? "show" : ""} `}
          placeholder="Поиск"
          type="text" 
          value={search}
          onChange={this.handleChange}
        />
        {(isOpen === true) ?  <button
          className="search-btn"
          onClick={this.toggleSearch}
          type="button"
        >
         <img className="Закрыть" src={CloseBtn} alt="Закрыть" />
        </button>
         :  <button
          className="search-btn"
          onClick={this.toggleSearch}
          type="button"
        >
         <img className="SearchIco" src={SearchIco} alt="Поиск" />
        </button> }
      </div>
    );
  }
}

export { Search };