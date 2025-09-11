import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Preloader } from "../components/Preloader";
import "./style.css";

function GamePage() {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const ratingStyles = {
    exceptional: { label: "Исключительный", color: "gold" },
    recommended: { label: "Рекомендуемый", color: "green" },
    meh: { label: "Средний", color: "gray" },
    skip: { label: "Пропустить", color: "red" },
  };

  useEffect(() => {
    setLoading(true);
    setError(null);

    const apiUrl = `https://api.rawg.io/api/games/${id}?key=d8fc05cc67f04e5bbab96f5d93677084`;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) throw new Error(`Ошибка: ${response.status}`);
        return response.json();
      })
      .then((data) => setGame(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Preloader />;
  if (error) return <p>Ошибка: {error}</p>;
  if (!game) return <p>Данные не найдены</p>;

  return (
    <div
      className="container-background"
      style={{
        backgroundImage: game.background_image_additional
          ? `url(${game.background_image_additional})`
          : game.background_image
            ? `url(${game.background_image})`
            : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <div
        className="container-full"
        style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}
      >
        <h1 className="GamePage__title">{game.name}</h1>

        {/* Главное изображение */}
        {game.background_image ? (
          <img
            src={game.background_image}
            alt={game.name}
            style={{
              width: "100%",
              height: "400px",
              objectFit: "cover",
              objectPosition: "top",
              borderRadius: "8px",
              marginBottom: "16px",
            }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "400px",
              backgroundColor: "#ccc",
              borderRadius: "8px",
              marginTop: "16px",
              marginBottom: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Нет изображения
          </div>
        )}

        <div className="gamePage-wrapper">
          {/* Разработчики */}
          <h5>Разработчик:</h5>
          {game.developers?.length > 0 ? (
            <div className="developer">
              <p>{game.developers[0].name}</p>
              {game.developers[0].image_background && (
                <img
                  src={game.developers[0].image_background}
                  width="200"
                  alt={game.developers[0].name}
                />
              )}
            </div>
          ) : (
            <p>Нет информации</p>
          )}

          {/* Оценки */}
          <h5>Оценки:</h5>
          {game.ratings?.length > 0 ? (
            <div className="ranking">
              {game.ratings.map((g, index) => {
                const style = ratingStyles[g.title] || {
                  label: g.title,
                  color: "black",
                };
                return (
                  <div
                    className="ranking-item"
                    key={`${g.title}-${index}`}
                    style={{ marginBottom: "8px" }}
                  >
                    <div style={{ color: style.color, fontWeight: "bolder" }}>
                      {style.label}:
                    </div>
                    <div>Количество: {g.count}</div>
                    <div>Процент: {g.percent}%</div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p>Нет оценок</p>
          )}

          {/* Теги */}
          <h5>Теги:</h5>
          <div className="tags">
            {game.tags?.length > 0 ? (
              game.tags.map((tag) => (
                <a key={tag.id} href="#">
                  {tag.name}
                </a>
              ))
            ) : (
              <p>Нет тегов</p>
            )}
          </div>

          {/* Сайт */}
          <h5>Веб-сайт</h5>
          {game.website ? (
            <a href={game.website} target="_blank" rel="noopener noreferrer">
              {game.website}
            </a>
          ) : (
            <p>Ссылка отсутствует</p>
          )}

          {/* Информация */}
          <h5>Описание:</h5>
          <p>
            <strong>Дата релиза:</strong> {game.released || "Не указана"}
          </p>
          <p>
            <strong>Рейтинг:</strong>{" "}
            {game.rating ? `${game.rating} / 5` : "Нет рейтинга"}
          </p>
          <p>
            <strong>Оценка на Metacritic:</strong>{" "}
            {game.metacritic || "Нет оценки"}
          </p>
          <p>
            <strong>Платформы:</strong>{" "}
            {game.platforms?.map((p) => p.platform.name).join(", ") ||
              "Не указаны"}
          </p>
          <p>
            <strong>Жанры:</strong>{" "}
            {game.genres?.map((g) => g.name).join(", ") || "Не указаны"}
          </p>

          {/* Описание */}
          {game.description_raw && <p>{game.description_raw}</p>}

          <button
            onClick={() => window.history.back()}
            className="GamePage__btn-back"
          >
            ← Назад к списку
          </button>
        </div>
      </div>
    </div>
  );
}

export { GamePage };
