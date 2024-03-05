import React from "react";
import styled from "styled-components";
import { IconContext } from "react-icons";
import { FaLocationArrow } from "react-icons/fa6";

const Wrapper = styled.div`
  display: block;
  width: 100%;
  height: 100%;

  .temp {
    display: block;
    font-size: 4rem;
    font-weight: 400;
    margin-left: 1rem;
    margin-bottom: 1rem;
    margin-top: -1rem;
    background: -webkit-linear-gradient(#eef4fe, #c0dbff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .icon {
    height: 3rem;
    width: 3rem;
    margin-left: 0.5rem;
  }

  .temp-desc {
    margin-top: -1rem;
    font-size: 1.2rem; 
    margin-left: 1rem;
  }

`;

const LocationWrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 0.5rem;

  .location-name {
    font-size: 1.2rem;
    margin-left: 1rem;
    margin-right: 0.2rem;
  }

  .location-arrow {
    width: 1rem;
    height: 1rem;
  }
`;


const WeatherCard = ({ data }) => {
  const { main, weather } = data;
  const { temp, temp_min, temp_max } = main;
  const { icon, description } = weather[0];

  return (<Wrapper>
    <LocationWrapper>
      <IconContext.Provider
        value={{
          color: "#dbe7fc",
          className: "global-class-name",
          size: "2.0rem"
        }}
      >
        <span className="location-name">{data.name}</span>
        <FaLocationArrow className="location-arrow" />
      </IconContext.Provider>
    </LocationWrapper>
    <div className="temp">
      {temp}°c
    </div>
    <img className="icon" src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt="" />
    <div className="temp-desc">
      <div>{description.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}</div>
      <div>L: {temp_min}° H: {temp_max}°</div>
    </div>
  </Wrapper>)
};

export default WeatherCard;
