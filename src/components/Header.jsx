import { useState, useEffect } from "react";
import GradientBlinds from './GradientBlinds';
import {
    WiDaySunny,
    WiCloudy,
    WiRain,
    WiStrongWind,
    WiHumidity,
    WiBarometer,
    WiFog,
    WiSnow,
    WiThunderstorm,
    WiNa,
} from "react-icons/wi";
import './GradientBlinds.css';

const weatherStyles = [
  { keywords: ["sun", "clear"], gradient: "rgba(246, 211, 101, 0.25)", icon: <WiDaySunny size={60} /> },
  { keywords: ["cloud"], gradient: "rgba(189, 195, 199, 0.25)", icon: <WiCloudy size={60} /> },
  { keywords: ["rain", "drizzle"], gradient: "rgba(0, 198, 255, 0.25)", icon: <WiRain size={60} /> },
  { keywords: ["storm", "thunder"], gradient: "rgba(35, 37, 38, 0.25)", icon: <WiThunderstorm size={60} /> },
  { keywords: ["snow"], gradient: "rgba(131, 164, 212, 0.25)", icon: <WiSnow size={60} /> },
  { keywords: ["fog", "mist", "haze"], gradient: "rgba(117, 127, 154, 0.25)", icon: <WiFog size={60} /> },
];


function Header() {
    const [data, setData] = useState({
        city: "", country: "", temp: "", feelsLike: "", minTemp: "", maxTemp: "",
        humidity: "", pressure: "", visibility: "", description: "", icon: "",
        windSpeed: "", sunrise: "", sunset: "", isData: false
    });
    const [bg, setBg] = useState("linear-gradient(135deg, #6dd5ed, #2193b0)");
    const [icon, setIcon] = useState(<WiNa size={60} />);

    function fetchWeather(e) {
        e.preventDefault();
        const city = document.getElementById("search-bar").value;
        if (!city) return;

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f05797b5bf18fce412f06c38d4a07412&units=metric`)
            .then(res => res.json())
            .then(data => {
                const timezoneOffset = data.timezone;
                const formatTime = (unixTime, offset) => new Date((unixTime + offset) * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

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
                    sunset: formatTime(data.sys.sunset, timezoneOffset), isData: true
                });
            })
            .catch(err => console.error("Error fetching weather:", err));
    }

    useEffect(() => {
        if (!data?.description) {
            setBg("linear-gradient(135deg, #6dd5ed, #2193b0)");
            setIcon(<WiNa size={60} />);
            return;
        }
        const desc = data.description.toLowerCase();
        let matched = false;
        for (let style of weatherStyles) {
            if (style.keywords.some(k => desc.includes(k))) {
                setBg(style.gradient);
                setIcon(style.icon);
                matched = true;
                break;
            }
        }
        if (!matched) {
            setBg("linear-gradient(135deg, #6dd5ed, #2193b0)");
            setIcon(<WiNa size={60} />);
        }
    }, [data.description]);

    return (
        <div style={{ width: '100%', height: '100vh', position: 'relative', background: 'black', overflow: 'hidden' }}>
            <GradientBlinds
                gradientColors={["#FF9FFC", "#5227FF"]}
                angle={37}
                noise={0.3} 
                blindCount={46} 
                blindMinWidth={150}
                spotlightRadius={0.5} 
                spotlightSoftness={1} 
                spotlightOpacity={1}
                mouseDampening={0.15} 
                distortAmount={49} 
                shineDirection="left" 
                mixBlendMode="lighten"
                style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
            />

            {/* Navbar */}
            <nav style={{
                position: "absolute", top: "2rem", left: "50%", transform: "translateX(-50%)",
                zIndex: 100, width: "70%", background: "rgba(255,255,255,0.1)",
                backdropFilter: "blur(15px)", borderRadius: "20px", padding: "0.75rem 2rem",
                display: "flex", justifyContent: "space-between", alignItems: "center",
                boxShadow: "0 4px 30px rgba(0,0,0,0.1)"
            }}>
                <a className="navbar-brand text-white fs-2 fw-bold">Weatherly</a>
                <form className="d-flex w-50" role="search" onSubmit={fetchWeather}>
                    <input
                        id="search-bar" type="search" placeholder="Search" aria-label="Search"
                        className="form-control me-2"
                        style={{ borderRadius: "10px", border: "none", padding: "0.5rem 1rem" }}
                    />
                    <button type="submit" className="btn btn-primary" style={{ borderRadius: "10px" }}>Search</button>
                </form>
            </nav>

            {/* Weather Data */}
            {data.isData && (
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        zIndex: 50,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center", 
                        overflow: "hidden",
                        paddingTop: "120px",
                        width: "50%",
                        left: "50%", 
                        transform: "translateX(-50%)"
                    }}
                >
                    <div
                        style={{
                            width: "700px",
                            maxWidth: "90%",
                            background: bg,
                            color: "white",
                            borderRadius: "20px",
                            padding: "2rem",
                            boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
                            transition: "background 0.8s ease-in-out",
                        }}
                    >
                        <h2 className="text-center mb-3">{data.city}, {data.country}</h2>
                        <div className="d-flex justify-content-center align-items-center mb-4">
                            {icon} <span className="fs-4 ms-2 text-capitalize">{data.description}</span>
                        </div>
                        <h1 className="display-4 text-center fw-bold">{data.temp}°C</h1>
                        <p className="text-center">Feels Like: {data.feelsLike}°C</p>
                        <div className="d-flex justify-content-around my-3">
                            <p>Min: <strong>{data.minTemp}°C</strong></p>
                            <p>Max: <strong>{data.maxTemp}°C</strong></p>
                        </div>
                        <hr style={{ borderColor: "rgba(255,255,255,0.4)" }} />
                        <div className="row text-center">
                            <div className="col"><WiHumidity size={40} /> <p>{data.humidity}%</p> <small>Humidity</small></div>
                            <div className="col"><WiStrongWind size={40} /> <p>{data.windSpeed} km/h</p> <small>Wind</small></div>
                            <div className="col"><WiBarometer size={40} /> <p>{data.pressure} hPa</p> <small>Pressure</small></div>
                            <div className="col"><WiFog size={40} /> <p>{data.visibility / 1000} km</p> <small>Visibility</small></div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}

export default Header;
