import { Link } from 'react-router-dom';

function GameList({ name, released, background_image, rating, id }) {
  return (
    <div className="card-columns">
      <Link to={`/games/${id}`}>
        <div className="card">
          <div className="card-image">
            {background_image ? (
              <img
                className="activator"
                src={background_image}
                alt={name || "Изображение игры"}
              />
            ) : (
              <div
                style={{
                  marginTop: '30%',
                  color: 'black',
                  textAlign: 'center',
                }}
              >
                Изображение отсутствует
              </div>
            )}
          </div>
          <div className="card-content">
            <span className="card-title">{name || "Без названия"}</span>
            <p>
              Рейтинг: {rating ?? "Не указан"} | Релиз: {released || "Не указан"}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export { GameList };
