import { useState, useEffect, useCallback } from "react";
import { Footer } from "./layouts/Footer/Footer";
import { Main } from "./layouts/Main";
import { Header } from "./layouts/Header/Header";
import { HashRouter, Routes, Route } from "react-router-dom";
import { GamePage } from "./pages/GamePage";
import { PlatformCards } from "./components/cards/PlatformCards";
import { ScrollToTop } from "./components/ScrollToTop";
import { ScrollToTopButton } from "./components/ScrollToTopBtn";

const API_KEY = process.env.REACT_APP_RAWG_KEY;

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

  useEffect(() => {
    searchGames("");
  }, [searchGames]);

  return (
    <HashRouter
      future={{
    v7_startTransition: true,
    v7_relativeSplatPath: true,
  }}>
      <Header onSearch={searchGames} />
      <ScrollToTop />
      <Routes
    >
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
      <ScrollToTopButton />
    </HashRouter>
  );
}

export default App;
