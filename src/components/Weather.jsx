import React, { useEffect, useState } from "react";

const Weather = () => {
  const [apiData, setApiData] = useState();
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=a2881c4575cbd5ec277fb7b6cbfd1e0a`
      );
      const data = await res.json();

      if (res.ok) {
        // Convert temperature from Kelvin to Celsius
        const tempInCelsius = data.main.temp - 273.15;
        data.main.temp = tempInCelsius;

        setApiData(data);
      }
    };

    fetchData();
  }, [search]);

  return (
    <div className="box">
      <h2 style={{ textAlign: "center" }}>Weather App</h2>
      <h5 style={{ textAlign: "center" }}>
        Enter city name to check weather details
      </h5>

      <input
        type="text"
        name="search"
        placeholder="Search city..."
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />
      {apiData ? (
        <div className="element">
          <img
            src={
              "http://openweathermap.org/img/w/" +
              apiData.weather[0].icon +
              ".png"
            }
            alt="Weather Icon"
          />
          <p>
            Temp : <span>{apiData.main.temp.toFixed(2)}°C</span>
          </p>
          <p>
            Pressure : <span>{apiData.main.pressure}</span>{" "}
          </p>
          <p>
            Main : <span>{apiData.weather[0].description}</span>
          </p>
        </div>
      ) : (
        <p>No Data Found</p>
      )}
    </div>
  );
};

export default Weather;
