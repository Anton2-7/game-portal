import React from "react";
import { Games } from "../components/Games";
import { Preloader } from "../components/Preloader";

class Main extends React.Component {
  render() {
    const { gameSearch, loading, onSearch } = this.props;

    return (
      <main className="container content">
        {loading ? (
          <Preloader />
        ) : (
          <Games games={gameSearch} searchGames={onSearch} />
        )}
      </main>
    );
  }
}

export { Main };
