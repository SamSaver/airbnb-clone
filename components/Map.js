import { getCenter } from "geolib";
import { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";

function Map({ searchResults }) {
  const [selectedLocation, setselectedLocation] = useState({});
  const viewportChangeHandler = (nextViewport) => {
    setviewport(nextViewport);
  };

  //   Transform the searchResults objects in to the {lattitude: 37.44423, longitude: -4.33321 } object
  const coordinates = searchResults.map(({ lat, long }) => ({
    latitude: lat,
    longitude: long,
  }));

  const center = getCenter(coordinates);

  const [viewport, setviewport] = useState({
    width: "100%",
    height: "100%",
    latitude: center.latitude,
    longitude: center.longitude,
    zoom: 11,
  });

  return (
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/samsaver/cks17wjnt30l617qooae8uiee"
      mapboxApiAccessToken={process.env.NEXT_PUBLIC_mapbox_key}
      onViewportChange={viewportChangeHandler}
    >
      {searchResults.map((result) => (
        <div key={result.long}>
          <Marker
            longitude={result.long}
            latitude={result.lat}
            offsetLeft={-20}
            offsetTop={-10}
          >
            <p
              aria-label="push-pin"
              role="img"
              onClick={() => setselectedLocation(result)}
              className="cursor-pointer text-2xl animate-bounce"
            >
              📌
            </p>
          </Marker>

          {/* The Popper that should show if we click on a marker */}
          {selectedLocation.long === result.long && (
            <Popup
              onClose={() => setselectedLocation({})}
              closeOnClick={true}
              latitude={result.lat}
              longitude={result.long}
              className='z-20'
            >
              {result.title}
            </Popup>
          )}
        </div>
      ))}
    </ReactMapGL>
  );
}

export default Map;
