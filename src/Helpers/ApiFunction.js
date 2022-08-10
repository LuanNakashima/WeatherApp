export const getApiWeather = async (city) => {
  const key = '2f744037f6c542e1863150200220908';
  const urlAPI = `https://api.weatherapi.com/v1/current.json?key=${key}&q=${city}&aqi=no`;
  const response = await fetch(urlAPI);
  const data = await response.json();
  return data;
};

export const getApiCity = async () => {
  const token = '89006921b85f5f';
  const urlAPI = `https://ipinfo.io/189.4.184.2?token=${token}`;
  const response = await fetch(urlAPI);
  const data = await response.json();
  return data;
};
