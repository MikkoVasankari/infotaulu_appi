import { useState, useEffect } from "react";

function Weather() {
  const [locationData, setLocationData] = useState<LocationItem | undefined>(
    undefined
  );
  const [weatherData, setWeatherdata] = useState<WeatherItem | undefined>(
    undefined
  );

  interface LocationItem {
    results: Array<{
      timezone: string;
      name: string;
      country_code: string;
      admin2: string;
      latitude: number;
      longitude: number;
    }>;
  }

  interface WeatherItem {
    latitude: string;
    longitude: string;
    current_weather: {
      temperature: number;
      windspeed: number;
      is_day: number;
    };
  }

  async function fetchlocationData() {
    const response = await fetch(
      "https://geocoding-api.open-meteo.com/v1/search?name=Helsinki&count=1&language=en&format=json"
    );
    const jsonData = await response.json();
    setLocationData(jsonData);
  }

  async function fetchweatherData() {
    const response = await fetch(
      "https://api.open-meteo.com/v1/metno?latitude=60.3172&longitude=24.9633&current_weather=true"
    );
    const jsonData = await response.json();
    setWeatherdata(jsonData);
  }

  useEffect(() => {
    fetchlocationData();
    fetchweatherData();
  }, []);


  return (
    <div>
      <p> {locationData?.results[0].name}</p>
      <p> {weatherData?.current_weather.temperature} °C</p>
      
    </div>
  );
}

export default Weather;
