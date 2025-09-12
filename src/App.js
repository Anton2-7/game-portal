import React, { useState, useEffect } from "react";
import { Header } from "./layouts/Header";
import { Footer } from "./layouts/Footer";
import { Main } from "./layouts/Main";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { GamePage } from "./pages/GamePage";
import { PlatformCards } from "./components/сards/PlatformCards";
import { ScrollToTop } from "./components/ScrollToTop";

const API_KEY = process.env.REACT_APP_RAWG_KEY;

function App() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true); // Изначально true, чтобы показать прелоадер
  // функция поиска игр
  const searchGames = async (query) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.rawg.io/api/games?key=${API_KEY}&search=${query}`
      );
      const data = await res.json();
      setGames(data.results || []);
      console.log("Данные загружены:", data);
      // на случай если results нет
    } catch (err) {
      console.error("Ошибка при загрузке данных:", err);
    } finally {
      setLoading(false);
    }
  };

  // <-- добавлена закрывающая скобка
  // при первом запуске — загрузить что-то по умолчанию
  useEffect(() => {
    searchGames("cyberpunk");
  }, []);

  return (
    <>
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
          searchGames={searchGames}
          element={<PlatformCards API_KEY={API_KEY} />}
        />
        <Route
          path="/games/:id"
          element={<GamePage loading={loading} API_KEY={API_KEY} />}
        ></Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
