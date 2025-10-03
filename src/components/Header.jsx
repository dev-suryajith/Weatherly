import { useState } from "react";
import Result from "./Result";

function Header() {
    const [data, setData] = useState({
        city: "",
        country: "",
        temp: "",
        feelsLike: "",
        minTemp: "",
        maxTemp: "",
        humidity: "",
        pressure: "",
        visibility: "",
        description: "",
        icon: "",
        windSpeed: "",
        sunrise: "",
        sunset: "",
        isData: false
    });

    function fetchWeather(e) {
        e.preventDefault();

        const city = document.getElementById("search-bar").value;
        if (!city) return;

        console.log("Fetching Weather", city);

        fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f05797b5bf18fce412f06c38d4a07412&units=metric`
        )
            .then((res) => res.json())
            .then((data) => {
                const timezoneOffset = data.timezone;

                const formatTime = (unixTime, timezoneOffset) => {
                    const utcDate = new Date(unixTime * 1000);
                    const localTime = new Date(utcDate.getTime() + timezoneOffset * 1000);

                    return localTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
                };


                setData({
                    city: data.name,
                    country: data.sys.country,
                    temp: data.main.temp,
                    feelsLike: data.main.feels_like,
                    minTemp: data.main.temp_min,
                    maxTemp: data.main.temp_max,
                    humidity: data.main.humidity,
                    pressure: data.main.pressure,
                    visibility: data.visibility,
                    description: data.weather[0].description,
                    icon: data.weather[0].icon,
                    windSpeed: data.wind.speed,
                    sunrise: formatTime(data.sys.sunrise, timezoneOffset),
                    sunset: formatTime(data.sys.sunset, timezoneOffset),
                    isData: true
                });
            })
            .catch((err) => console.error("Error fetching weather:", err));
    }

    return (
        <>
            <nav className="navbar" style={{ background: "#2193b0" }}>
                <div className="container-fluid p-3">
                    <a className="navbar-brand text-white fs-2 fw-bold">Weatherly</a>
                    <form className="d-flex w-25 me-5" role="search" onSubmit={fetchWeather}>
                        <input
                            className="form-control me-2"
                            id="search-bar"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                        />
                        <button className="btn btn-primary" type="submit">
                            Search
                        </button>
                    </form>
                </div>
            </nav>

            {data.isData && <Result data={data} />}
        </>
    );
}

export default Header;
