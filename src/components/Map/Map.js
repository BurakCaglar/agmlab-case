import React from "react";
import { latLngBounds } from "leaflet";
import {
  FeatureGroup,
  MapContainer,
  Marker,
  Popup,
  /* Rectangle, */
  TileLayer,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";

import { useCityContext } from "../../context/context";

const purpleOptions = { color: "purple" };

const Map = () => {
  const { locationOnMap } = useCityContext();
  const {
    centerLat,
    centerLon,
    /*   northEastLat,
    northEastLon,
    southWestLat,
    southWestLon, */
  } = locationOnMap;

  const center = [centerLat, centerLon];
  /* const rectangle = [
    [51.49, -0.08],
    [51.5, -0.06],
  ]; */

  const bounds = latLngBounds([center]);

  function ChangeView({ center, zoom }) {
    const map = useMap();
    map.setView(center, zoom);
    return null;
  }

  return (
    <div className="map container container-center animate">
      <MapContainer
        center={center}
        zoom={13}
        scrollWheelZoom={false}
        bounds={bounds}
      >
        <ChangeView center={center} zoom={13} />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        <Marker
          position={center}
          icon={
            new Icon({
              iconUrl: markerIconPng,
              iconSize: [35, 55],
              iconAnchor: [17, 41],
            })
          }
        >
          <Popup>Hello, this is {locationOnMap.county || "Anıtkabir"}.</Popup>
        </Marker>
        <FeatureGroup pathOptions={purpleOptions}>
          {/* <Rectangle bounds={rectangle} /> */}
        </FeatureGroup>
      </MapContainer>
    </div>
  );
};

export default Map;
