import { useEffect, useState } from "react";
import './style.css';
import gpsIcon from "../../images/gps-2.png";
import { useSearchParams } from "react-router-dom";

const API_KEY_WEATHER = process.env.REACT_APP_WHEATHER_API_KEY;
const UNITS = "metric";
const LANG = "ru";

export function Weather() {
    const [coords, setCoords] = useState(null);
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);
    const [showInput, setShowInput] = useState(false);
    const [cityInput, setCityInput] = useState("");

    const [searchParams, setSearchParams] = useSearchParams();

    const getPosition = () => {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) return reject("Геолокация не поддерживается");

            navigator.geolocation.getCurrentPosition(
                (pos) => resolve(pos.coords),
                (err) => reject(err),
                { timeout: 5000 } // 5 секунд
            );
        });
    };

    const fetchWeather = async ({ city, latitude, longitude }) => {
        const controller = new AbortController();
        try {
            let url = "";

            if (city) {
                url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY_WEATHER}&units=${UNITS}&lang=${LANG}`;
            } else if (latitude && longitude) {
                url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY_WEATHER}&units=${UNITS}&lang=${LANG}`;
            } else {
                throw new Error("Нет данных для запроса погоды");
            }

            const res = await fetch(url, { signal: controller.signal });
            if (!res.ok) throw new Error("Город или координаты не найдены");

            const data = await res.json();
            setWeather(data);

            // Сохраняем город и координаты в localStorage
            if (data.name) {
                setCity(data.name);
            }
            if (data.coord) {
                const c = { latitude: data.coord.lat, longitude: data.coord.lon };
                setCoords(c);
                localStorage.setItem("coords", JSON.stringify(c));
            }

            setError(null);
        } catch (err) {
            console.error(err);
            setError(err.message || "Ошибка при получении погоды");
        }

        return () => controller.abort();
    };

    // Сохранение города localStorage и URL
    const setCity = (city) => {
        setCityInput(city);
        localStorage.setItem("selectedCity", city);
        searchParams.set("city", city);
        setSearchParams(searchParams);
    };


    useEffect(() => {
        let isMounted = true;

        const loadWeather = async () => {
            try {
                // Проверка данных в URL
                const cityFromUrl = searchParams.get("city");
                if (cityFromUrl && isMounted) {
                    await fetchWeather({ city: cityFromUrl });
                    return;
                }

                // Проверка данных в localStorage
                const cityFromStorage = localStorage.getItem("selectedCity");
                if (cityFromStorage && isMounted) {
                    await fetchWeather({ city: cityFromStorage });
                    return;
                }

                const coordsFromStorage = localStorage.getItem("coords");
                if (coordsFromStorage && isMounted) {
                    const { latitude, longitude } = JSON.parse(coordsFromStorage);
                    setCoords({ latitude, longitude });
                    await fetchWeather({ latitude, longitude });
                    return;
                }

                // Получаение геолокации
                try {
                    const geoCoords = await getPosition();
                    if (!isMounted) return;
                    setCoords(geoCoords);
                    await fetchWeather({ latitude: geoCoords.latitude, longitude: geoCoords.longitude });
                } catch {
                    if (!isMounted) return;
                    setError("Не удалось получить геолокацию. Введите город вручную.");
                    setShowInput(true);
                }
            } catch (err) {
                if (!isMounted) return;
                setError("Ошибка при загрузке погоды. Введите город вручную.");
                setShowInput(true);
            }
        };

        loadWeather();

        return () => {
            isMounted = false;
        };
    }, [searchParams]);


    return (
        <div>
            {weather && (
                <div className="weather">
                    <div className="weather-wrapper">
                        <h4 className="weather-name">{weather.name}</h4>
                        <h5 className="weather-temp">{Math.round(weather.main.temp)}°C</h5>
                    </div>

                    <div className="weather-content">
                        <img
                            className="weather-img"
                            alt="погода"
                            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                        />
                        <p>{weather.weather[0].description}</p>
                    </div>
                </div>
            )}

            {error && <p style={{ color: "red" }}>{error}</p>}

            {(!showInput && !weather) && (
                <button className="wheather-location__btn" onClick={() => setShowInput(true)}>
                    <img
                        width="13"
                        height="13"
                        style={{ marginRight: '5px' }}
                        alt="уточнить местоположение"
                        src={gpsIcon}
                    />
                    Уточнить местоположение
                </button>
            )}

            {showInput && (
                <div className="weather-show">
                    <input
                        type="text"
                        placeholder="Введите город"
                        value={cityInput}
                        onChange={(e) => setCityInput(e.target.value)}
                        className="weather-input"
                    />
                    <button
                        className="weather-show__btn"
                        onClick={async () => {
                            await fetchWeather({ city: cityInput });
                            if (!error) setShowInput(false);
                        }}
                    >
                        Показать погоду
                    </button>
                </div>
            )}
        </div>
    );
}
