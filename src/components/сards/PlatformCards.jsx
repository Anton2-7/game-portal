import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Preloader } from "../Preloader";
import { RadioInput } from "../RadioInput";
import "./style.css";
import { Pagination } from "../Pagination/Pagination";

const API_KEY = "d8fc05cc67f04e5bbab96f5d93677084";
const PAGE_SIZE = 20; // Количество игр на страницу

function PlatformCards() {
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
            console.log("Загруженные игры:", data);

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


    return (
        <main className="container content">
            {loading ? (
                <Preloader />
            ) : (
                <>
                    <div
                        className="platform-filter"
                        style={{ display: "flex", alignItems: "center", textAlign: "left" }}
                    >
                        <p style={{ marginRight: "20px" }}>Фильтр по платформе: </p>
                        <RadioInput
                            onSelect={handleSelectPlatform}
                            onClear={handleClear}
                            style={{ marginRight: "10px" }}
                        />
                        <p onClick={handleClear} className="platform__clear-btn">
                            Очистить
                        </p>
                    </div>

                    {selectedPlatform ? (
                        <div>
                            <div className="platform-title">{selectedPlatform.name}</div>
                            <div className="grid">
                                {games.map((item) => (
                                    <div key={item.id} className="cardd">
                                        <Link to={`../games/${item.id}`}>
                                            {item.background_image && (
                                                <img
                                                    className="platform-img"
                                                    src={item.background_image}
                                                    alt={item.name}
                                                    style={{ width: "100%" }}
                                                />
                                            )}
                                            <div className="platform-content">
                                                <h3 className="platform-title">{item.name}</h3>
                                            </div>
                                        </Link>
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
                        <div className="grid">
                            {platforms.map((item) => (
                                <Link to={`?platform=${item.id}`} key={item.id}>
                                    <h4 className="platform-title">{item.name}</h4>
                                    <div className="cardd">
                                        <div className="image-wrapper">
                                            <img
                                                className="platform-img"
                                                src={item.image_background}
                                                alt={item.name}
                                            />
                                        </div>
                                        <div className="platform-content">
                                            <p>Всего игр: {item.games_count}</p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </>
            )}
        </main>


    );
}

export { PlatformCards };