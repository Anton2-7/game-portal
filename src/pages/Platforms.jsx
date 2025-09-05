import { useState, useEffect } from "react";
import './style.css'

function Platforms () {
const [platforms, setPlatforms] = useState([]);
      const [loading, setLoading] = useState(true); //


const SearchPlatforms = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.rawg.io/api/platforms?key=d8fc05cc67f04e5bbab96f5d93677084&search
`
      );
      const data = await res.json();
      setPlatforms(data.results || [])
            console.log("Данные загружены:", data);

    } catch (err) {
      console.error("Ошибка при загрузке данных:", err);
    } finally {
      setLoading(false);

    }
  };
  
   useEffect(() => {
      SearchPlatforms("pc");
  
    }, []);
  


    return (
        <div className="platforms">
        {platforms.map((platform) => (
  <div key={platform.id}>
    <h4>{platform.name}</h4>
    <img
      className="platforms__images"
      src={platform.image_background}
      alt={`Фон ${platform.name}`}
    />
    <div>
      <span className="platforms__games">
        Выпущено игр: <strong>{platform.games_count}</strong>
      </span>
    </div>

    {/* Рендерим первые 3 игры */}
    <div className="platforms__games-list">
      {platform.games && platform.games.length > 0 ? (
        platform.games.map((game) => (
          <span key={game.id} className="game-tag">
            <p>{game.name}</p>
          </span>
        ))
      ) : (
        <span>Игр нет</span>
      )}
    </div>
  </div>
))}

            </div>

    )
}
export { Platforms };