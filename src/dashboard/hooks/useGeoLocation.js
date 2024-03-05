import { useState, useEffect } from "react";

const useGeoLocation = () => {
  const [crd, setCrd] = useState(null);

  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  useEffect(() => {
    function getLocation() {
      if (navigator.geolocation) {
        navigator.permissions.query({ name: 'geolocation' }).then(permissionStatus => {
          if (permissionStatus.state === 'denied') {
            alert('Please allow location access.');
            window.location.href = "app-settings:location";
          } else {
            navigator.geolocation.getCurrentPosition((pos) => {
              // console.log("Your current position is:");
              // console.log(`Latitude : ${pos.coords.latitude}`);
              // console.log(`Longitude: ${pos.coords.longitude}`);
              // console.log(`More or less ${pos.coords.accuracy} meters.`);
              setCrd(pos.coords);
            },
              (err) => {
                console.warn(`ERROR(${err.code}): ${err.message}`);
              },
              options);
          }

        });
      } else {
        alert('Geolocation is not supported in your browser.');
      }
    }
    getLocation()
  }, []);

  return { crd };
};

export default useGeoLocation;
