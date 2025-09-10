// src/pages/GameDetailPage.jsx
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Preloader } from "../components/Preloader";

function GamePage() {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const apiUrl = `https://api.rawg.io/api/games/${id}?key=d8fc05cc67f04e5bbab96f5d93677084`;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Ошибка: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setGame(data);
        console.log("Game data:", data);
      })
      .catch((err) => {
        console.error('Ошибка при загрузке игры:', err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Preloader />;
  if (error) return <div style={{ color: 'red', textAlign: 'center' }}>Ошибка: {error}</div>;
  if (!game) return <div style={{ textAlign: 'center' }}>Данные об игре не найдены</div>;

  return (
    <div className="container" style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 className="GamePage__title">{game.name}</h1>

      {game.background_image ? (
        <img
          src={game.background_image}
          alt={game.name}
          style={{
            width: '100%',
            height: '400px',
            objectFit: 'cover',
            borderRadius: '8px',
            marginBottom: '16px',
          }}
        />
      ) : (
        <div
          style={{
            width: '100%',
            height: '400px',
            backgroundColor: '#ccc',
            borderRadius: '8px',
            marginTop: '16px',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          Нет изображения
        </div>
      )}
      <div className="gamePage-wrapper">
        <p><strong>Дата релиза:</strong> {game.released || 'Не указана'}</p>
        <p><strong>Рейтинг:</strong> {game.rating ? `${game.rating} / 5` : 'Нет рейтинга'}</p>

        <p><strong>Платформы:</strong>{' '}
          {Array.isArray(game.platforms)
            ? game.platforms.map((p) => p.platform.name).join(', ')
            : 'Не указаны'}
        </p>

        <p><strong>Жанры:</strong>{' '}
          {Array.isArray(game.genres)
            ? game.genres.map((g) => g.name).join(', ')
            : 'Не указаны'}
        </p>

        {game.description_raw && (
          <div>
            <h3>Описание</h3>
            <p>{game.description_raw}</p>
          </div>
        )}
      </div>

      <button
        onClick={() => window.history.back()}
        className="GamePage__btn-back"
      >
        ← Назад к списку
      </button>
    </div>
  );
}

export { GamePage };
