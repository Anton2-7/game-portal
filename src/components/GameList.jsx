import { Link } from 'react-router-dom';

function GameList(props) {
  const { name, released, background_image, rating, id} = props;
  return (
    <>
  <div className="card-columns">
  <Link to={`/games/${id}`}>
    <div className="card">
    <div className="card-image">
      { background_image ? <img className="activator" src={background_image}/> : <div style={{marginTop: '30%', color: 'black', textAlign: 'center'}}>Изображение отсутствует</div>}
    </div>
    <div className="card-content">
      <span className="card-title">{name}</span>
              <p>Рейтинг: {rating} | Релиз: {released}</p>
    </div>
       </div>

  </Link>
   </div>

    </>
  );
}
export { GameList };
