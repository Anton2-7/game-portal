import { GameList } from "./GameList";
import { SearchM } from "./SearchM";

function Games({ games = [], searchGames }) {
  return (
    <>
      <div className="searchM_wrapper">
        <SearchM onSearch={searchGames} />
      </div >

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
