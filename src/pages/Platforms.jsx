import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Preloader } from "../components/Preloader";
import { RadioInput } from "../components/RadioInput";
import "./style.css";
import { Pagination } from "../components/Pagination/Pagination";

const API_KEY = "d8fc05cc67f04e5bbab96f5d93677084";
const PAGE_SIZE = 20; // Количество игр на страницу

export function Platforms() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [platforms, setPlatforms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [games, setGames] = useState([]);
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
  const [totalPages, setTotalPages] = useState(1);

  const platformIdFromUrl = searchParams.get("platform");
  // Загружаем список платформ
  const loadAllPlatforms = async () => {
    setLoading(true);
    try {
      const res = await fetch(`https://api.rawg.io/api/platforms?key=${API_KEY}`);
      const data = await res.json();
      setPlatforms(data.results || []);
    } catch (e) {
      console.error("Ошибка загрузки платформ:", e);
    } finally {
      setLoading(false);
    }
  };


  // Загружаем игры для выбранной платформы с пагинацией
  const loadGamesForPlatform = async (platformId, page = 1) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.rawg.io/api/games?key=${API_KEY}&platforms=${platformId}&page_size=${PAGE_SIZE}&page=${page}`
      );
      const data = await res.json();
      setGames(data.results || []);
      setTotalPages(Math.ceil((data.count || 3) / PAGE_SIZE));
    } catch (e) {
      console.error("Ошибка загрузки игр:", e);
    } finally {
      setLoading(false);
    }
  };

  // Выбор платформы
  const handleSelectPlatform = (id, name) => {
    setSelectedPlatform({ id, name });
    setPage(1);
    setSearchParams({ platform: id, page: 1 });
    loadGamesForPlatform(id, 1);
  };

  // Переключение страниц
  const handlePageChange = (newPage) => {
    setPage(newPage);
    setSearchParams({ platform: selectedPlatform.id, page: newPage });
    loadGamesForPlatform(selectedPlatform.id, newPage);

  };

  // Очистка фильтра
  const handleClear = () => {
    setSelectedPlatform(null);
    setGames([]);
    setPage(1);
    setSearchParams({});
  };


  // При первом рендере проверяем URL
  useEffect(() => {
    loadAllPlatforms();
  }, []);

  useEffect(() => {
    if (platformIdFromUrl) {
      const platform = platforms.find(p => p.id === Number(platformIdFromUrl));
      if (platform) {
        setSelectedPlatform(platform);
        loadGamesForPlatform(platform.id, page);
      }
    }
  }, [platforms, platformIdFromUrl, page]);

  if (loading) return <Preloader />;

  return (
    <div>
      <div className="platform-filter" style={{ display: "flex", gap: 12 }}>
        <p>Фильтр по платформе:</p>
        <RadioInput onSelect={handleSelectPlatform} onClear={handleClear} />
      </div>
      <p onClick={handleClear} style={{ cursor: "pointer", color: "blue" }}>
        Очистить
      </p>

      {selectedPlatform ? (
        <div>
          <h2 className="platform-title">{selectedPlatform.name}</h2>
          <div className="games">
            {games.map((g) => (
              <div key={g.id} className="game-card">
                <div className="card-columns">
                  <div className="card">
                    <div className="card-media">
                      <div className="card-media__wrapper">
                        <Link to={`../games/${g.id}`}><h4 className="platform-title">{g.name}</h4></Link>
                        {g.background_image && (
                          <img src={g.background_image} alt={g.name} style={{ width: "100%" }} />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />

        </div>
      ) : (
        <div className="platforms">
          {platforms.map((p, id) => (
            <div className="games" key={id}>
              <div className="game-card" key={p.id}>
                <div className="card-columns">
                  <div className="card">
                    <div className="card-media">
                      <div className="card-media__wrapper-li">
                        <Link to={`?platform=${p.id}`}><h4 className="platform-title">{p.name}</h4></Link>
                        {p.image_background && (
                          <img
                            src={p.image_background}
                            alt={p.name}
                            style={{ width: "100%", marginBottom: 10 }}
                          />
                        )}
                        <p>Всего игр: {p.games_count}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
