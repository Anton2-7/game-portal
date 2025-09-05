// src/pages/GameDetailPage.jsx
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Preloader } from "../components/Preloader";

function GamePage() {
  const { id } = useParams();
  const [game, setGame] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Пример API: RAWG (https://rawg.io/apidocs)
    // Замени на свой бэкенд, если нужно
    const apiUrl = `https://api.rawg.io/api/games/${id}?key=d8fc05cc67f04e5bbab96f5d93677084&search`; // ← вставь свой ключ, если нужно

    fetch(apiUrl)
      .then((response) => {
            setLoading(true);

        if (!response.ok) {
          throw new Error(`Ошибка: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setGame(data);
        console.log({data})
        setLoading(false);
      })
      .catch((err) => {
        console.error('Ошибка при загрузке игры:', err);
        setError(err.message);
        setLoading(false);
      });
  }, [id]);


  return (
    <>
    { loading ? (
        <Preloader/>
    ) : (
  <div className="container" style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', marginTop: '38px', }}>
      <h1 className="GamePage__title">{game.name}</h1>



      {game.background_image ?    <img
          src={game.background_image}
          alt={game.name}
          style={{
            width: '100%',
            height: '400px',
            objectFit: 'cover',
            borderRadius: '8px',
            marginBottom: '16px',
          }}
        /> : <div style={{ width: '100%', height: '400px', backgroundColor: '#ccc', borderRadius: '8px', marginTop: '16px', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Нет изображения</div>}

      <p><strong>Дата релиза:</strong> {game.released}</p>
      <p><strong>Рейтинг:</strong> {game.rating} / 5</p>
      <p>
  <strong>Разработчик:</strong>{' '}
  {game.developers?.map((dev, index) => (
    <span key={dev.id || index}>
      {dev.name}
      {index < game.developers.length - 1 ? ', ' : ''}
    </span>
  )) || 'Не указан'}
</p>
      <p><strong>Платформы:</strong> {game.platforms?.map(p => p.platform.name).join(', ') || 'Не указаны'}</p>

      {game.description_raw && (
        <div>
          <h3>Описание</h3>
          <p>{game.description_raw}</p>
        </div>
      )}
      
      <button
        onClick={() => window.history.back()}
        className="GamePage__btn-back"
      >
        ← Назад к списку
      </button>
    </div>
    )}
  </>
)
}

export  {GamePage};