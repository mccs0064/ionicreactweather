import axios from 'axios';
import { Weather } from "../models/weather";
import { Forecast } from '../models/forecast';

const API_BASE_URL = 'https://api.openweathermap.org/data/2.5';
const API_KEY = '43ad955f407583d979e8d5924b70fb98';
const APPID = `?APPID=${API_KEY}`;
const METRIC = '&units=metric';

async function getWeatherForLatLng(lat: number, lng: number): Promise<Weather> {
  const url = `${API_BASE_URL}/weather${APPID}&lat=${lat}&lon=${lng}${METRIC}`;
  try {
    const response = await axios.get(url);
    const data = response.data;
    return new Weather(data.main.temp, data.weather[0].main, data.weather[0].description, data.weather[0].icon, new Date(data.dt * 1000))
  } catch(e) {
    throw e;
  }   
}

async function getForecastForCity(cityName: string): Promise<Forecast> {
  const url = `${API_BASE_URL}/forecast${APPID}&q=${cityName}${METRIC}`;
  try {
    const response = await axios.get(url);
    const data = response.data.list;

    return data
              .filter((weather: any) => weather.dt_txt.includes('12:00:00'))
              .map((weatherItem: any) =>
                new Weather(
                  weatherItem.main.temp,
                  weatherItem.weather[0].main,
                  weatherItem.weather[0].description,
                  weatherItem.weather[0].icon,
                  new Date(weatherItem.dt * 1000)
                )
              )
  } catch(e) {
    throw e;
  }  
}

export {
  getWeatherForLatLng,
  getForecastForCity
}
