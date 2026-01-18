import { useEffect, useState, useCallback, useRef, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { RadioInput } from "../RadioInput";
import "./style.css";
import { Pagination } from "../Pagination/Pagination";
import { SkeletonCard } from "./SkeletonCard";

const PAGE_SIZE = 20;
const API_KEY = "d8fc05cc67f04e5bbab96f5d93677084";
const BASE_URL = "https://api.rawg.io/api";

export function PlatformCards() {
    const [searchParams, setSearchParams] = useSearchParams();

    // URL — единственный источник истины
    const platformId = Number(searchParams.get("platform")) || null;
    const page = Number(searchParams.get("page")) || 1;

    // State для данных
    const [platforms, setPlatforms] = useState([]);
    const [games, setGames] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [loadingPlatforms, setLoadingPlatforms] = useState(true);
    const [loadingGames, setLoadingGames] = useState(false);

    const gamesControllerRef = useRef(null);

    // Выбранная платформа
    const selectedPlatform = useMemo(
        () => platforms.find(p => p.id === platformId) || null,
        [platforms, platformId]
    );

    // Загрузка платформ

    useEffect(() => {
        const controller = new AbortController();
        const loadPlatforms = async () => {
            setLoadingPlatforms(true);
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
                if (!controller.signal.aborted) setLoadingPlatforms(false);
            }
        };

        loadPlatforms();
        return () => controller.abort();
    }, []);

    // Загрузка игр

    const loadGamesForPlatform = useCallback(async (platformId, page) => {
        if (!platformId) return;

        if (gamesControllerRef.current) {
            gamesControllerRef.current.abort();
        }

        const controller = new AbortController();
        gamesControllerRef.current = controller;

        setLoadingGames(true);

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
            if (!controller.signal.aborted) console.error("Ошибка загрузки игр:", e);
        } finally {
            if (!controller.signal.aborted) setLoadingGames(false);
        }
    }, []);

    useEffect(() => {
        if (!platformId) {
            setGames([]);
            setTotalPages(1);
            return;
        }

        loadGamesForPlatform(platformId, page);
    }, [platformId, page, loadGamesForPlatform]);

    // Handler → меняет только URL


    const handleSelectPlatform = (id) => {
        setSearchParams({ platform: id, page: "1" });
    };

    const handlePageChange = (newPage) => {
        setSearchParams({ platform: platformId, page: String(newPage) });
    };

    const handleClear = () => {
        setSearchParams({});
    };


    return (
        <main className="container content">
            {(!loadingPlatforms || selectedPlatform) && (
                <div className="platform-filter" style={{ display: "flex", textAlign: "left" }}>
                    <p><b>Игровая платформа:</b></p>
                    <RadioInput
                        selectedPlatform={platformId}
                        onSelect={handleSelectPlatform}
                        onClear={handleClear}
                        style={{ marginLeft: "10px" }}
                    />
                </div>
            )}

            {selectedPlatform ? (
                <div>
                    <div className="platform-title">{selectedPlatform.name}</div>

                    {loadingGames ? (
                        <div className="grid">
                            {Array.from({ length: PAGE_SIZE }).map((_, i) => (
                                <SkeletonCard key={i} isPlatform />
                            ))}
                        </div>
                    ) : (
                        <>
                            <div className="grid">
                                {games.map((item) => (
                                    <Link key={item.id} className="card" to={`../games/${item.id}`}>
                                        <div className="image-wrapper">
                                            {item.background_image ? (
                                                <img className="platform-img" src={item.background_image} alt={item.name} />
                                            ) : (
                                                <div className="no-image">Нет изображения</div>
                                            )}
                                        </div>
                                        <div className="platform-content">
                                            <h4 className="platform-title">{item.name}</h4>
                                        </div>
                                    </Link>
                                ))}
                            </div>

                            <Pagination
                                page={page}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                            />
                        </>
                    )}
                </div>
            ) : loadingPlatforms ? (
                <div className="grid">
                    {Array.from({ length: 12 }).map((_, i) => (
                        <SkeletonCard key={i} isPlatform />
                    ))}
                </div>
            ) : (
                <div className="grid">
                    {platforms.map((item) => (
                        <Link key={item.id} className="card" to={`?platform=${item.id}&page=1`}>
                            <div className="image-wrapper">
                                {item.image_background ? (
                                    <img className="platform-img" src={item.image_background} alt={item.name} />
                                ) : (
                                    <div className="no-image">Нет изображения</div>
                                )}
                            </div>
                            <div className="platform-content">
                                <h4 className="platform-title">{item.name}</h4>
                                <p>Всего игр: {item.games_count}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </main>
    );
}
