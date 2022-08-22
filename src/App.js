import React, { useState, useEffect } from 'react';
import { getApiWeather, getApiCity } from './Helpers/ApiFunction';
import './App.css';
import bateriaIcon from './Images/bateria-cheia.png'
import wifiIcon from './Images/sinal-wifi.png'
import sinalIcon from './Images/sinal.png'


function App() {
  const [city, setCity] = useState('');
  const [time, setTime] = useState('');
  const [region, setRegion] = useState('');
  const [weather, setWeather] = useState('');
  const [graus, setGraus] = useState(0);
  const [cityInput, setCityInput] = useState('');
  const [weatherIcon, setWeatherIcon] = useState('');

  const weatherFunc = async (param) => {
    const { current: weather, location } = await getApiWeather(param);
    const hour = location.localtime
      .split('')
      .filter((a, i) => i > 10)
      .toString()
      .replace(',', '')
      .replace(',', '')
      .replace(',', '')
      .replace(',', '');
    setCity(location.name);
    setTime(hour);
    setRegion(`${location.country}, ${location.region}`);
    setWeather(weather.condition.text);
    setGraus(weather.temp_c);
    setWeatherIcon(weather.condition.icon);
  };

  useEffect(() => {
    (async () => {
      const { city: cityApi } = await getApiCity();
      await weatherFunc(cityApi);
    })();
  }, []);

  return (
    <div className="App">
      <div className="phone">
        <div className="screen">
          <div className="top">
            <div className="dock-left">
              <h4 className="clock">{time}</h4>
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
