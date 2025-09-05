import React from "react";
import SearchIco from "../images/icons8-search.svg";
import CloseBtn from "../images/close_10015296.png"

class Search extends React.Component {
  state = {
    search: '',
    type: 'all',
    isOpen: false
  };

  handleFilter = (event) => {

  }

  toggleSearch = () => {
    this.setState((prevState) => ({
      isOpen: !prevState.isOpen,
      search: '' // Очистка строки поиска при закрытии 
    }));
  };

 handleKey = (e) => {
    if (e.key === "Enter") {
      this.props.onSearch(this.state.search);
    }
  }

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
          onKeyDown={this.handleKey}
        />
        {(isOpen === true) ?  <button
          className="search-btn"
          onClick={this.toggleSearch}
          type="button"
          datatype="all"
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