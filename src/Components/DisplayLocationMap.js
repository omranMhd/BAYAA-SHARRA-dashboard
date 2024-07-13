import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { Box } from "@mui/material";

const DisplayLocationMap = ({ location }) => {
  const [center, setCenter] = useState({
    lat: Number(location?.latitude),
    lng: Number(location?.longitude),
  });

  const containerStyle = {
    width: "100%", // Fixed width in pixels
    height: "400px",
    borderRadius: "20px" /* Adjust this value to control the roundness */,
    overflow:
      "hidden" /* Ensures the map content is clipped to the rounded corners */,
  };

  return (
    <>
      <LoadScript googleMapsApiKey="AIzaSyC3pAbk5F8mVSuzWNTukfOVfh3IGTi-chE">
        <GoogleMap mapContainerStyle={containerStyle} zoom={8} center={center}>
          <Marker
            key={`marker-${Math.random()}`}
            //   position={{ lat: 33.3851, lng: 36.1734 }}
            position={center}

            //   icon={'/BAYAASHARRA.ico'} // Use your custom icon here
          />
        </GoogleMap>
      </LoadScript>
    </>
  );
};

export default DisplayLocationMap;
