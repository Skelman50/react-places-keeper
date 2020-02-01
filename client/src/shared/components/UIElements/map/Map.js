// import React, { useRef, useEffect } from "react";

// import "./Map.css";

// const Map = props => {
//   const mapRef = useRef();

//   const { center, zoom } = props;

//   useEffect(() => {
//     const map = new window.google.maps.Map(mapRef.current, {
//       center: center,
//       zoom: zoom
//     });

//     new window.google.maps.Marker({ position: center, map });
//   }, [center, zoom]);

//   return (
//     <div
//       ref={mapRef}
//       className={`map ${props.className}`}
//       style={props.style}
//     ></div>
//   );
// };

// export default Map;

import React, { useState } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import { IoIosPin } from "react-icons/io";
import "mapbox-gl/dist/mapbox-gl.css";

import "./Map.css";

const Map = ({ center, zoom, style, className }) => {
  const [viewport, setViewport] = useState({
    latitude: center.lat,
    longitude: center.lng,
    zoom
  });

  return (
    <div className={`map ${className}`} style={style}>
      <ReactMapGL
        {...viewport}
        onViewportChange={setViewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPGL_TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        width="100%"
        height="100%"
      >
        <Marker latitude={center.lat} longitude={center.lng}>
          <IoIosPin color="red" fontSize="25px" />
        </Marker>
      </ReactMapGL>
    </div>
  );
};

export default Map;
