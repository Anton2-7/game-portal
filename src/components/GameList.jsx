import { Link } from 'react-router-dom';

function GameList(props) {
  const { name, released, background_image, rating, id} = props;
  return (
    <>

  <Link to={`/games/${id}`} className="card">
    <div className="card-image waves-effect waves-block waves-light">
      <img className="activator" src={background_image}/>
    </div>
    <div className="card-content">
      <span className="card-title activator grey-text text-darken-4">{name}<i className="material-icons right"></i></span>
              <p>Рейтинг: {rating} | Релиз: {released}</p>

    </div>
   
  </Link>

    </>
  );
}
export { GameList };
