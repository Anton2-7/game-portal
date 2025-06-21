import React from "react";
import SerachGrayIcn from "../images/searchGray_Icn.png"

class SearchM extends React.Component {
  state = {
    search: '',
  };

  toggleClear= () => {
    this.setState(() => ({
      search: '' 
    }));
  };

  handleChange = (e) => {
    this.setState({
      search: e.target.value
    });
  };

  render() {
    const { search } = this.state;

    return (
      <div className="row r-searchM">
        <input
          id="searchM"
          className="searchM"
          placeholder="Поиск"
          type="text" 
          value={search}
          onChange={this.handleChange}/>
                    <img width="30" height="30" className="search-icon" src={SerachGrayIcn} alt="Поиск" />

       <button className="clearSearchBtn" onClick={this.toggleClear}>Очистить</button>
      </div>
    );
  }
}

export { SearchM };