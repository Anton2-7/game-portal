import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Preloader } from "../components/Preloader.jsx";
import "./style.css";

const API_KEY = "d8fc05cc67f04e5bbab96f5d93677084";


function GamePage() {
  const { id } = useParams();
  const navigate = useNavigate();

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
    const controller = new AbortController();
    const signal = controller.signal;

    const loadGame = async () => {
      setLoading(true);
      setError(null);
      try {
        const url = `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
        const res = await fetch(url, { signal });
        if (!res.ok) throw new Error(`Ошибка: ${res.status}`);
        const data = await res.json();
        if (!signal.aborted) {
          setGame(data)
          setLoading(false);
          // Отмена запроса при выходе из эффекта
        }
      } catch (err) {
        if (signal.aborted) return; // Игнорироварие, если отменено
        if (err.name === "TimeoutError") {
          setError("Превышено время ожидания ответа от сервера");
        } else {
          setError(err.message || "Неизвестная ошибка");
        }
      } finally {
        if (!signal.aborted) {
          setLoading(false);
        }
      };
    }

    if (id) {
      loadGame();
    }
    return () => {
      controller.abort();
    };
  }, [id])

  if (loading) return <div className="height-100"><Preloader /></div>;
  if (error) return <p>Ошибка: {error}</p>;
  if (!game) return <p>Данные об играх не найдены</p>;

  const background = game.background_image_additional || game.background_image || "";

  return (
    <>
      <div
        className="container-background"
        style={{
          backgroundImage: background ? `url(${background})` : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
        }}
      >
        <div
          className="container-full"
          style={{ maxWidth: "800px", margin: "0 auto" }}
        >
          <h1 className="GamePage__title">{game.name}</h1>

          {/* Главное изображение */}
          {game.background_image ? (
            <img
              src={game.background_image}
              alt={game.name}
              style={{
                width: "100%",
                height: "auto",
                objectFit: "cover",
                objectPosition: "top",
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
            <h5>Разработчики:</h5>
            {game.developers?.length > 0 ? (
              game.developers.map((dev) => (
                <div key={dev.id} className="developer">
                  <p>{dev.name}</p>
                  {dev.image_background && (
                    <img
                      src={dev.image_background}
                      width="200"
                      alt={dev.name}
                      style={{ borderRadius: "4px", marginTop: "8px" }}
                    />
                  )}
                </div>
              ))
            ) : (
              <p>Нет информации</p>
            )}

            {/* Рейтинги */}
            <h5>Оценки:</h5>
            {game.ratings?.length > 0 ? (
              <div className="ranking">
                {game.ratings.map((g, index) => {
                  const style =
                    ratingStyles[g.title.toLowerCase()] || { label: g.title, color: "black" };
                  return (
                    <div className="ranking-item" key={`${g.title}-${index}`} style={{ marginBottom: "8px" }}>
                      <div style={{ color: style.color, fontWeight: "bolder" }}>{style.label}:</div>
                      <div>Количество: {g.count}</div>
                      <div>Процент: {g.percent}%</div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p>Нет оценок</p>
            )}

            {/* Теги через запятую */}
            <h5>Теги:</h5>
            <div className="tags">
              {game.tags?.length > 0
                ? game.tags.map((tag) => <button className="tag_btn" key={tag.id}>{tag.name}</button>)
                : "Нет тегов"}
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

            {/* Основная информация */}
            <h5>Описание:</h5>
            <p>
              <strong>Дата релиза:</strong> {game.released || "Не указана"}
            </p>
            <p>
              <strong>Рейтинг:</strong> {game.rating ? `${game.rating} / 5` : "Нет рейтинга"}
            </p>
            <p>
              <strong>Оценка на Metacritic:</strong> {game.metacritic || "Нет оценки"}
            </p>
            <p>
              <strong>Платформы:</strong>{" "}
              {game.platforms?.map((p) => p.platform.name).join(", ") || "Не указаны"}
            </p>
            <p>
              <strong>Жанры:</strong>{" "}
              {game.genres?.map((g) => g.name).join(", ") || "Не указаны"}
            </p>

            {game.description_raw && <p>{game.description_raw}</p>}

            <button onClick={() => navigate(-1)} className="GamePage__btn-back">
              ← Назад к списку
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export { GamePage };
