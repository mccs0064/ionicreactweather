import { useState, useEffect } from 'react';
import { Plugins, GeolocationPosition } from '@capacitor/core';
import { getWeatherForLatLng, getForecastForCity } from '../services/weather.service';
import { Weather } from '../models/weather';
import { Forecast } from '../models/forecast';

const { Geolocation } = Plugins;

const useWeatherForCurrentLocation = (): [boolean, Weather | null] => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [weather, setWeather] = useState<Weather| null>(null);
  async function getLocation() {
    try {
      const position: GeolocationPosition = await Geolocation.getCurrentPosition()
      return {lat: position.coords.latitude, lng: position.coords.longitude}
    } catch {
      return null;
    }
  }

  useEffect(() => {
    const fetchWeather = async () => {
      setIsLoading(true);
      try {
        const coords = await getLocation();
        if(coords) {
          const weather: Weather = await getWeatherForLatLng(coords.lat, coords.lng);
          setWeather(weather);
        }
      } catch (e) {
        return null;
      } finally {
        setIsLoading(false);
      }
    }
    fetchWeather()
  }, [])

  return [isLoading, weather]
}

const useForecast = (cityName: string): [boolean, Forecast | null] => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [forecast, setForecast] = useState<Forecast| null>(null);
  useEffect(() => {
    const fetchForecast = async () => {
      setIsLoading(true);
      try {
        if(cityName) {
          const forecast: Forecast = await getForecastForCity(cityName);
          setForecast(forecast);
        }
      } catch (e) {
        return null;
      } finally {
        setIsLoading(false);
      }
    }
    fetchForecast();
  }, [cityName])

  return [isLoading, forecast]
}

export {
  useWeatherForCurrentLocation,
  useForecast
}