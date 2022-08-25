export const getApiWeather = async (city) => {
  const key = 'a3c0222e1ea94c593d3bcef3aee8410f';
  const urlAPI = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${key}`
  const response = await fetch(urlAPI);
  const data = await response.json();
  return data;
}

export const getApiCity = async () => {
  const token = '89006921b85f5f';
  const urlAPI = `https://ipinfo.io/189.4.184.2?token=${token}`;
  const response = await fetch(urlAPI);
  const { city, country, region } = await response.json();
  return { city, country, region };
};
