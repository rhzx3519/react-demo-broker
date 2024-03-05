import React from 'react';
import useFetchWeather from '../hooks/useFetchWeather';
import WeatherCard from './WeatherCard';
import useGeoLocation from '../hooks/useGeoLocation';
import LoaderWrapper from '../common/LoaderWrapper';
import './Weather.css';


const CardWrapper = (data) => {
  return (<>
    {data && <WeatherCard data={data.data} />}
  </>)
}

const Weather = () => {
  const { crd } = useGeoLocation();
  const { data, loading } = useFetchWeather({ crd });

  return (<div className='Weather'>
    {loading ? (
      <LoaderWrapper />
    ) :
      <CardWrapper data={data} />
    }
  </div>)
};

export default Weather;