import React, { useState, useEffect } from "react";
import { Header } from "./layouts/Header";
import { Footer } from "./layouts/Footer";
import { Main } from "./layouts/Main";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { GamePage } from "./pages/GamePage";
import { PlatformCards } from "./components/сards/PlatformCards";
import { ScrollToTop } from "./components/ScrollToTop";

function App() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true); // Изначально true, чтобы показать прелоадер

  // функция поиска игр
  const searchGames = async (query) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.rawg.io/api/games?key=d8fc05cc67f04e5bbab96f5d93677084&search=${query}`
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
          element={<PlatformCards />}
        />
        <Route
          path="/games/:id"
          element={<GamePage loading={loading} />}
        ></Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
