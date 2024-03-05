import { useState, useEffect } from "react";

const useFetchWeather = ({ crd }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (!crd) {
        return
      }
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${crd?.latitude}&lon=${crd?.longitude}&units=metric`
      const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
      const response = await fetch(`${url}&appid=${API_KEY}`);
      const fetchedData = await response.json();

      setData(fetchedData);
      setLoading(false);
    }
    fetchData();
  }, [crd]);
  return { data, loading };
};

export default useFetchWeather;
