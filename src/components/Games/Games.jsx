import { GameList } from "../GameList/GameList";
import "./style.css";
import { SearchM } from "../SearchM/SearchM";

function Games({ games = [], searchGames }) {
  return (
    <>
      <main className="searchM_wrapper">
        <SearchM onSearch={searchGames} />
      </main >

      <div className="games">
        {games.length > 0 ? (
          games.map((game) => <GameList key={game.id} {...game} />)
        ) : (
          <p>Нет игр для отображения</p>
        )}
      </div >
    </>
  );
}

export { Games };
