import { Game } from "./Game";
import { SearchM } from "./SearchM";

function Games(props) {
  const { games } = props;
  return (
    <>
      <SearchM onSearch={props.searchGames} />
      <div className="games">
        {games.map((game) => (
          <Game key={game.id} {...game} />
        ))}
      </div>
    </>
  );
}

export { Games };
