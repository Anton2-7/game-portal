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

    const fetchWeatherByCoords = async (lat, lon) => {
        try {
            const res = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY_WEATHER}&units=${units}&lang=${lang}`
            );
            if (!res.ok) throw new Error("Ошибка запроса погоды");
            const data = await res.json();
            setWeather(data);
            setError(null);
            setCity(data.name);
        } catch (err) {
            setError("Не удалось определить погоду автоматически. Введите город вручную.");
        }
    };

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
            setError("Город не найден. Попробуйте другой.");
        }
    };

    const setCity = (city) => {
        setCityInput(city);
        localStorage.setItem('selectedCity', city);
        searchParams.set('city', city);
        setSearchParams(searchParams);
    };

    useEffect(() => {
        const cityFromUrl = searchParams.get('city');
        if (cityFromUrl) {
            fetchWeatherByCity(cityFromUrl);
            return;
        }

        const cityFromStorage = localStorage.getItem('selectedCity');
        if (cityFromStorage) {
            fetchWeatherByCity(cityFromStorage);
            return;
        }

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const { latitude, longitude } = pos.coords;
                    setCoords({ latitude, longitude });
                    fetchWeatherByCoords(latitude, longitude);
                },
                () => {
                    setError("Не удалось получить геолокацию. Введите город вручную.");
                    setShowInput(true);
                }
            );
        } else {
            setError("Геолокация не поддерживается. Введите город вручную.");
            setShowInput(true);
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
                </div>
            )}

            {error && <p style={{ color: "red" }}>{error}</p>}

            {(!showInput && !weather) && (
                <button className="wheather-location__btn" onClick={() => setShowInput(true)}>
                    <img width="13" height="13" style={{ marginRight: '5px' }} alt="уточнить местоположение" src={gpsIcon} />
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
                    <button className="weather-show__btn" onClick={async () => {
                        await fetchWeatherByCity(cityInput);
                        if (!error) setShowInput(false);
                    }}>
                        Показать погоду
                    </button>
                </div>
            )}
        </div>
    );
}

export { Weather };
