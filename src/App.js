import React, { useState, useEffect } from 'react';
import { getApiWeather, getApiCity } from './Helpers/ApiFunction';
import './App.css';
import bateriaIcon from './Images/bateria-cheia.png'
import wifiIcon from './Images/sinal-wifi.png'
import sinalIcon from './Images/sinal.png'


function App() {
  const [city, setCity] = useState('');
  const [region, setRegion] = useState('');
  const [weather, setWeather] = useState('');
  const [graus, setGraus] = useState(0);
  const [cityInput, setCityInput] = useState('');
  const [weatherIcon, setWeatherIcon] = useState('');

  const weatherFunc = async (city) => {
    const { main, name, weather } = await getApiWeather(city);
    console.log(main);
    console.log(weather);
    const iconWeather = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${
      weather[0].icon
    }.svg`
    setCity(name);
    setWeather(weather[0].description);
    setGraus(String(main.temp).substring(0,2));
    setWeatherIcon(iconWeather);
  };

  useEffect(() => {
    (async () => {
      const { city, country, region } = await getApiCity();
      setRegion(`${country} - ${region}`);
      await weatherFunc(city);
    })();
  }, []);

  return (
    <div className="App">
      <div className="phone">
        <div className="screen">
          <div className="top">
            <div className="dock-left">
              <h4 className="clock">12:00</h4>
            </div>
            <div className="dock">
              <div className="sensor"></div>
              <div className="speaker"></div>
              <div className="camera"></div>
            </div>
            <div className="dock-right">
              <div className="signal">
                <img
                  className="icon"
                  src={ sinalIcon }
                />
              </div>
              <div className="wifi">
                <img className="icon" src={ wifiIcon } />
              </div>
              <div className="battery">
                <img
                  className="icon"
                  src={ bateriaIcon }
                />
              </div>
            </div>
          </div>
          <h1>WeatherApp☁️</h1>
          <div className="datas">
            <h1 className="city">{city}</h1>
            <h4 className="region">{region}</h4>
            <h1 className="graus">{`${graus}°C`}</h1>
            <h3 className="weather">{weather}</h3>
            <img className="weatherIcon" src={ weatherIcon } />
          </div>
          <div className="inputs">
            <input
              type="text"
              value={cityInput}
              placeholder="City"
              onChange={({ target }) => {
                setCityInput(target.value);
              }}
            />
            <button
              onClick={async () => {
                await weatherFunc(cityInput);
              }}>
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
