import { useEffect, useState, useCallback, useRef } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Preloader } from "../Preloader";
import { RadioInput } from "../RadioInput";
import "./style.css";
import { Pagination } from "../Pagination/Pagination";

const PAGE_SIZE = 20;
const API_KEY = "d8fc05cc67f04e5bbab96f5d93677084";
const BASE_URL = "https://api.rawg.io/api"; // ✅ Без пробелов!

export function PlatformCards() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [platforms, setPlatforms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedPlatform, setSelectedPlatform] = useState(null);
    const [games, setGames] = useState([]);
    const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
    const [totalPages, setTotalPages] = useState(1);

    // Используем ref для отмены запросов — не вызывает ререндеров
    const gamesControllerRef = useRef(null);

    // Загрузка игр для выбранной платформы
    const loadGamesForPlatform = useCallback(async (platformId, page = 1) => {
        // Отменяем предыдущий запрос
        if (gamesControllerRef.current) {
            gamesControllerRef.current.abort();
        }

        const controller = new AbortController();
        gamesControllerRef.current = controller;

        setLoading(true);
        try {
            const url = `${BASE_URL}/games?key=${API_KEY}&platforms=${platformId}&page_size=${PAGE_SIZE}&page=${page}`;
            const res = await fetch(url, { signal: controller.signal });

            if (!res.ok) throw new Error(`HTTP ${res.status}`);

            const data = await res.json();
            if (!controller.signal.aborted) {
                setGames(data.results || []);
                setTotalPages(Math.ceil((data.count || 0) / PAGE_SIZE));
            }
        } catch (e) {
            if (!controller.signal.aborted) {
                console.error("Ошибка загрузки игр:", e);
            }
        } finally {
            if (!controller.signal.aborted) {
                setLoading(false);
            }
        }
    }, []); // ✅ Зависимости пустые, так как BASE_URL, API_KEY, PAGE_SIZE — константы

    // Выбор платформы
    const handleSelectPlatform = (id, name) => {
        setSelectedPlatform({ id, name });
        setPage(1);
        setSearchParams({ platform: id, page: "1" });
        loadGamesForPlatform(id, 1);
    };

    // Переключение страниц
    const handlePageChange = (newPage) => {
        setPage(newPage);
        setSearchParams({ platform: selectedPlatform.id, page: String(newPage) });
        loadGamesForPlatform(selectedPlatform.id, newPage);
    };

    // Очистка фильтра
    const handleClear = () => {
        setSelectedPlatform(null);
        setGames([]);
        setPage(1);
        setSearchParams({});
    };

    // Загрузка списка платформ при монтировании
    useEffect(() => {
        const controller = new AbortController();

        const loadPlatforms = async () => {
            setLoading(true);
            try {
                const res = await fetch(`${BASE_URL}/platforms?key=${API_KEY}`, {
                    signal: controller.signal,
                });
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const data = await res.json();
                if (!controller.signal.aborted) {
                    setPlatforms(data.results || []);
                }
            } catch (e) {
                if (!controller.signal.aborted) {
                    console.error("Ошибка загрузки платформ:", e);
                }
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        };

        loadPlatforms();

        return () => {
            controller.abort();
        };
    }, []);

    // Обработка URL-параметров (платформа + страница)
    const platformIdFromUrl = searchParams.get("platform");
    useEffect(() => {
        if (!platformIdFromUrl || platforms.length === 0) return;

        const platformId = Number(platformIdFromUrl);
        const platform = platforms.find(p => p.id === platformId);
        if (!platform) return;

        const pageFromUrl = Number(searchParams.get("page")) || 1;
        setSelectedPlatform(platform);
        setPage(pageFromUrl);
        loadGamesForPlatform(platformId, pageFromUrl);
    }, [platforms, platformIdFromUrl, searchParams, loadGamesForPlatform]);

    return (
        <main className="container content">
            {loading && !selectedPlatform && platforms.length === 0 ? (
                <Preloader />
            ) : (
                <>
                    <div className="platform-filter" style={{ display: "flex", textAlign: "left" }}>
                        <p><b>Игровая платформа:</b></p>
                        <RadioInput
                            selectedPlatform={selectedPlatform?.id || null}
                            onSelect={handleSelectPlatform}
                            onClear={handleClear}
                            style={{ marginLeft: "10px" }}
                        />
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