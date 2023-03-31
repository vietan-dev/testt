import React, { useEffect, useState } from 'react';
import "./style.css"
const iconList = [
    {
        type: "Clear",
        img: "https://cdn-icons-png.flaticon.com/512/6974/6974833.png",
    },
    {
        type: "Rain",
        img: "https://cdn-icons-png.flaticon.com/512/3351/3351979.png",
    },
    {
        type: "Snow",
        img: "https://cdn-icons-png.flaticon.com/512/642/642102.png",
    },
    {
        type: "Clouds",
        img: "https://cdn-icons-png.flaticon.com/512/414/414825.png",
    },
    {
        type: "Haze",
        img: "https://cdn-icons-png.flaticon.com/512/1197/1197102.png",
    },
    {
        type: "Smoke",
        img: "https://cdn-icons-png.flaticon.com/512/4380/4380458.png",
    },
    {
        type: "Mist",
        img: "https://cdn-icons-png.flaticon.com/512/4005/4005901.png",
    },
    {
        type: "Drizzle",
        img: "https://cdn-icons-png.flaticon.com/512/3076/3076129.png",
    },
];

const WeatherApp = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [icon, setIcon] = useState("");
    const handleInputChange = (event) => {
        setCity(event.target.value);
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        const apiKey = '9690d14d1940b75fe570a1c72b4c2be1';
        const url = `api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}`;
        const response = await fetch(url);
        const data = await response.json();
        setWeatherData(data);
        const currentWeather = data.current.condition.text;
        const currentType = iconList.find((type) =>
            currentWeather.toLowerCase().includes(type.type.toLowerCase())
        );
        setIcon(currentType.img);
    };
    return (
        <div className='app'>
            <main>
                <form onSubmit={handleSubmit} className='search-box'>
                    <input
                        className='search-bar'
                        type="text"
                        value={city}
                        onChange={handleInputChange} />
                </form>
                {weatherData && (
                    <div>
                        <div className='location-box'>
                            <h2 className='location'>Weather for {weatherData.location.name}</h2>
                        </div>
                        <div className='weather-box'>
                            <img src={icon} alt={weatherData.current.condition.text} className="weather-icon" />
                            <div className="temp">
                                <p>Temperature: {weatherData.current.temp_c}°C</p>
                            </div>
                            <div className="weather">
                                <p>Condition: {weatherData.current.condition.text}</p>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};
export default WeatherApp;
