import React from "react";
import { Games } from "../components/Games";
import { Preloader } from "../components/Preloader";

class Main extends React.Component {
  state = {
    games: [],
  };


  componentDidMount(){
    fetch('https://api.rawg.io/api/games?key=d8fc05cc67f04e5bbab96f5d93677084&search=cyberpunk&page=1&page_size=10')
    .then(response => response.json())
    .then(data => this.setState({games: data.results}))
    .catch(error => console.error("Ошибка при загрузке данных:", error));

  }

  render() {
    const { games } = this.state;
    return (
      <main className="container content">
        {games.length ? (
          <Games games={this.state.games} />
        ) : (
          <Preloader/>
        )}
      </main>
    );
  }
}

export { Main };
