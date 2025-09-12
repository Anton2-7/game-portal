import { useEffect, useState } from "react";
import './style.css';
import gpsIcon from "../../images/gps-2.png";
import { useSearchParams } from "react-router-dom";

const API_KEY_WEATHER = process.env.REACT_APP_WHEATHER_API_KEY;


function Weather() {
    const [coords, setCoords] = useState(null);
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);
    const [showInput, setShowInput] = useState(false);
    const [cityInput, setCityInput] = useState("");

    const [searchParams, setSearchParams] = useSearchParams();


    const units = "metric";
    const lang = "ru";

    // Функция запроса погоды по координатам
    const fetchWeatherByCoords = async (lat, lon) => {
        try {
            const res = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY_WEATHER}&units=${units}&lang=${lang}`
            );
            if (!res.ok) throw new Error("Ошибка запроса погоды");
            const data = await res.json();
            setWeather(data);
            setError(null);
            // Сохраняем город при получении данных
            setCity(data.name);
        } catch (err) {
            setError(err.message);
        }
    };

    // Функция запроса погоды по названию города
    const fetchWeatherByCity = async (city) => {
        try {
            const res = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY_WEATHER}&units=${units}&lang=${lang}`
            );
            if (!res.ok) throw new Error("Город не найден");
            const data = await res.json();
            setWeather(data);
            setCoords({ latitude: data.coord.lat, longitude: data.coord.lon });
            setError(null);
            setCity(data.name);
        } catch (err) {
            setError(err.message);
        }
    };

    // Функция установки города в localStorage и URL
    const setCity = (city) => {
        setCityInput(city);
        localStorage.setItem('selectedCity', city);
        searchParams.set('city', city);
        setSearchParams(searchParams);
    };

    // Инициализация при загрузке компонента
    useEffect(() => {
        // 1️⃣ Проверяем URL
        const cityFromUrl = searchParams.get('city');
        if (cityFromUrl) {
            fetchWeatherByCity(cityFromUrl);
            return;
        }

        // 2️⃣ Проверяем localStorage
        const cityFromStorage = localStorage.getItem('selectedCity');
        if (cityFromStorage) {
            fetchWeatherByCity(cityFromStorage);
            return;
        }

        // 3️⃣ Если ничего нет — используем геолокацию
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const { latitude, longitude } = pos.coords;
                    setCoords({ latitude, longitude });
                    fetchWeatherByCoords(latitude, longitude);
                },
                () => console.log("Геолокация недоступна")
            );
        }
    }, []);

    return (
        <div>
            {weather && (
                <div className="weather">
                    <div className="weather-wrapper">
                        <h4 className="weather-name">{weather.name}</h4>
                        <h5 className="weather-temp">{Math.round(weather.main.temp)}°C</h5>
                    </div>


                    <div className="weather-content">
                        <img className="weather-img" alt="погода" src={`https://openweathermap.org/img/wn/${weather.weather[0]['icon']}@2x.png`} />
                        <p>{weather.weather[0].description}</p>
                    </div>
                    {error && <p style={{ color: "red" }}>{error}</p>}

                    {
                        !showInput && (
                            <button className="wheather-location__btn" onClick={() => setShowInput(true)}>
                                <img width="13" height="13" style={{ marginRight: '5px' }} alt="уточнить местоположение" src={gpsIcon} />
                                Уточнить местоположение
                            </button>
                        )
                    }

                    {
                        showInput && (
                            <div className="weather-show">
                                <input
                                    type="text"
                                    placeholder="Введите город"
                                    value={cityInput}
                                    onChange={(e) => setCityInput(e.target.value)}
                                    className="weather-input"
                                />
                                <button className="weather-show__btn" onClick={async () => {
                                    await fetchWeatherByCity(cityInput);
                                    setShowInput(false);
                                }}>
                                    <div className="wave-container">
                                        <svg className="wave wave1" viewBox="0 0 200 25" preserveAspectRatio="none">
                                            <path
                                                fill="#1551eaff"
                                                opacity="0.5"
                                                d="M0 15 Q25 3 50 15 T100 15 T150 15 T200 15 V25 H0z"
                                            />
                                        </svg>
                                        <svg className="wave wave2" viewBox="0 0 200 25" preserveAspectRatio="none">
                                            <path
                                                fill="#f70808ff"
                                                opacity="0.7"
                                                d="M0 15 Q25 8 50 15 T100 15 T150 15 T200 15 V25 H0z"
                                            />
                                        </svg>
                                    </div> <p>Показать погоду</p>
                                </button>
                            </div>
                        )
                    }
                </div>

            )
            }


        </div >
    );
}

export { Weather };
