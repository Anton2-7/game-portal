import { GameList } from "./GameList";
import { SearchM } from "./SearchM";

function Games(props) {
  const { games } = props;
  return (
    <>

      <SearchM onSearch={props.searchGames} />
      <div className="games">
        {games.map((game) => (
          <GameList key={game.id} {...game} />
        ))}
      </div>
    </>
  );
}

export { Games };
