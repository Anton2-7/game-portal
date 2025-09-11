import React from "react";
import SearchIco from "../images/icons8-search.svg";
import CloseBtn from "../images/icons8-close-24.svg";
import flag from "../images/flag.gif";

class Search extends React.Component {
  state = {
    search: '',
    isOpen: false
  };

  toggleSearch = () => {
    this.setState(prev => ({
      isOpen: !prev.isOpen,
      search: ''
    }));
  };

  handleKey = (e) => {
    if (e.key === "Enter") {
      this.props.onSearch(this.state.search);
    }
  }

  handleChange = (e) => {
    this.setState({ search: e.target.value });
  };

  render() {
    const { location } = this.props;
    const { search, isOpen } = this.state;

    if (!location || location.pathname !== "/") {
      return <img src={flag} alt="flag" className="flag-img" />;
    }

    return (
      <div className="row r-search">
        <input
          id="search"
          className={`validate ${isOpen ? "show" : ""}`}
          placeholder="Поиск"
          type="text"
          value={search}
          onChange={this.handleChange}
          onKeyDown={this.handleKey}
        />
        <button
          className="search-btn"
          onClick={this.toggleSearch}
          type="button"
        >
          <img
            src={isOpen ? CloseBtn : SearchIco}
            alt={isOpen ? "Закрыть" : "Поиск"}
          />
        </button>
      </div>
    );
  }
}

export { Search };
