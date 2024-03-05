import React from "react"; 
import { Bars } from "react-loader-spinner";

const LoaderWrapper = () => {
  return (
    <div style={{ margin: 'auto' }}>
    <Bars
      height="80"
      width="80"
      color="#ffffff"
      ariaLabel="bars-loading"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />
  </div>
  );
}

export default LoaderWrapper;