import { useState, useEffect, useCallback } from "react";
import { Header } from "./layouts/Header";
import { Footer } from "./layouts/Footer";
import { Main } from "./layouts/Main";
import { HashRouter, Routes, Route } from "react-router-dom";
import { GamePage } from "./pages/GamePage";
import { PlatformCards } from "./components/сards/PlatformCards";
import { ScrollToTop } from "./components/ScrollToTop";

const API_KEY = "d8fc05cc67f04e5bbab96f5d93677084";

function App() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  // функция поиска игр
  const searchGames = useCallback(async (query) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.rawg.io/api/games?key=${API_KEY}&search=${query}`
      );
      const data = await res.json();
      setGames(data.results || []);
      console.log("Данные загружены:", data);
    } catch (err) {
      console.error("Ошибка при загрузке данных:", err);
      setGames([]);
    } finally {
      setLoading(false);
    }
  },[]);

  // при первом запуске — загрузить игры по умолчанию
  useEffect(() => {
    searchGames("cyberpunk");
  }, [searchGames]);

  return (
    <HashRouter>
      <Header onSearch={searchGames} />
      <ScrollToTop />
      <Routes>
        <Route
          path="/"
          element={
            <Main gameSearch={games} loading={loading} onSearch={searchGames} />
          }
        />
        <Route
          path="/platforms"
          element={<PlatformCards searchGames={searchGames} />}
        />
        <Route
          path="/games/:id"
          element={<GamePage loading={loading} />}
        />
      </Routes>
      <Footer />
    </HashRouter>
  );
}

export default App;
