import React, { useState, useEffect } from 'react';
import { getApiWeather, getApiCity } from './Helpers/ApiFunction';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [time, setTime] = useState('');
  const [region, setRegion] = useState('');
  const [weather, setWeather] = useState('');
  const [graus, setGraus] = useState(0);
  const [cityInput, setCityInput] = useState('');

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
    console.log(weather);
    console.log(location);
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
              <span className="clock">{time}</span>
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
                  src="https://cdn-icons.flaticon.com/png/128/1594/premium/1594818.png?token=exp=1660141310~hmac=7a5360226f51b6fdc7805ae6fb6b604a"
                />
              </div>
              <div className="wifi">
                <img className="icon" src="https://cdn-icons-png.flaticon.com/128/88/88014.png" />
              </div>
              <div className="battery">
                <img
                  className="icon"
                  src="https://cdn-icons.flaticon.com/png/128/664/premium/664886.png?token=exp=1660141424~hmac=5473eaf94a381f9ca11629dacc021ecd"
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
          </div>
          <div className="inputs">
            <input
              type="text"
              value={cityInput}
              placeholder="Cidade"
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
