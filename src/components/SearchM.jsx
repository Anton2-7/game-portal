import React from "react";

class SearchM extends React.Component {
  state = {
    search: '',
  };

  toggleClear = () => {
    this.setState(() => ({
      games: 'cyberpunk',
      onSearch: this.props.onSearch('cyberpunk')

    }));
  };

  handleChange = (e) => {
    this.setState({
      search: e.target.value
    });
  };

  handleKey = (e) => {
    if (e.key === "Enter") {
      this.props.onSearch(this.state.search);
    }
  }



  render() {
    const { search } = this.state;

    return (

      <div className="r-searchM">
        <input
          id="searchM"
          className="searchM"
          placeholder="Поиск"
          type="text"
          value={search}
          onChange={this.handleChange}
          onKeyDown={this.handleKey}
        />

        <button className="clearSearchBtn" onClick={this.toggleClear}>Сброс</button>
      </div>
    );
  }
}

export { SearchM };