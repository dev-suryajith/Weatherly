import React, { useEffect, useState } from "react";
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

const weatherStyles = [
  {
    keywords: ["sun", "clear"],
    gradient: "linear-gradient(135deg, #f6d365, #fda085)",
    icon: <WiDaySunny size={60} />,
  },
  {
    keywords: ["cloud"],
    gradient: "linear-gradient(135deg, #bdc3c7, #2c3e50)",
    icon: <WiCloudy size={60} />,
  },
  {
    keywords: ["rain", "drizzle"],
    gradient: "linear-gradient(135deg, #00c6ff, #0072ff)",
    icon: <WiRain size={60} />,
  },
  {
    keywords: ["storm", "thunder"],
    gradient: "linear-gradient(135deg, #232526, #414345)",
    icon: <WiThunderstorm size={60} />,
  },
  {
    keywords: ["snow"],
    gradient: "linear-gradient(135deg, #83a4d4, #b6fbff)",
    icon: <WiSnow size={60} />,
  },
  {
    keywords: ["fog", "mist", "haze"],
    gradient: "linear-gradient(135deg, #757f9a, #d7dde8)",
    icon: <WiFog size={60} />,
  },
];

function Result({ data }) {
  const [bg, setBg] = useState("linear-gradient(135deg, #6dd5ed, #2193b0)");
  const [icon, setIcon] = useState(<WiNa size={60} />);

  useEffect(() => {
    if (!data?.description) {
      setBg("linear-gradient(135deg, #6dd5ed, #2193b0)");
      setIcon(<WiNa size={60} />);
      return;
    }

    const desc = data.description.toLowerCase();
    let matched = false;

    for (let style of weatherStyles) {
      if (style.keywords.some((k) => desc.includes(k))) {
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
    <div className="container my-5 d-flex justify-content-center">
      <div
        className="card shadow-lg p-4 rounded-4"
        style={{
          width: "700px",
          background: bg,
          color: "white",
          transition: "background 0.8s ease-in-out",
        }}
      >
        <h2 className="text-center mb-3">
          {data.city || "Unknown"}, {data.country || "--"}
        </h2>

        {/* Weather description */}
        <div className="d-flex justify-content-center align-items-center mb-4">
          {icon}
          <span className="fs-4 ms-2 text-capitalize">
            {data.description || "Not Available"}
          </span>
        </div>

        {/* Temperature */}
        <h1 className="display-4 text-center fw-bold">
          {data.temp !== undefined ? `${data.temp}°C` : "--"}
        </h1>
        <p className="text-center">
          Feels Like: {data.feelsLike !== undefined ? `${data.feelsLike}°C` : "--"}
        </p>
        
        {/* Min/Max Temperature */}
        <div className="d-flex justify-content-around my-3">
          <p>
            Min: <strong>{data.minTemp !== undefined ? `${data.minTemp}°C` : "--"}</strong>
          </p>
          <p>
            Max: <strong>{data.maxTemp !== undefined ? `${data.maxTemp}°C` : "--"}</strong>
          </p>
        </div>

        <hr style={{ borderColor: "rgba(255,255,255,0.4)" }} />

        {/* Humidity - Wind - Pressure - Visibility */}
        <div className="row text-center">
          <div className="col">
            <WiHumidity size={40} />
            <p>{data.humidity !== undefined ? `${data.humidity}%` : "--"}</p>
            <small>Humidity</small>
          </div>
          <div className="col">
            <WiStrongWind size={40} />
            <p>{data.windSpeed !== undefined ? `${data.windSpeed} km/h` : "--"}</p>
            <small>Wind</small>
          </div>
          <div className="col">
            <WiBarometer size={40} />
            <p>{data.pressure !== undefined ? `${data.pressure} hPa` : "--"}</p>
            <small>Pressure</small>
          </div>
          <div className="col">
            <WiFog size={40} />
            <p>{data.visibility !== undefined ? `${data.visibility / 1000} km` : "--"}</p>
            <small>Visibility</small>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Result;
