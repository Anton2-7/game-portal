import { Game } from "./Game";

function Games (props) {
    const {games} = props;
return (
    <>
    <div className="games">{games.map(game => (
        <Game key={game.id} {...game}/>
    ))}</div>
    </>
)
}

export {Games}