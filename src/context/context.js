import React, { useReducer, useState } from "react";
import CityReducer from "../reducer/CityReducer";

const CityContext = React.createContext();

const initialState = {
  coordinate: {},
};

export const CityContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CityReducer, initialState);
  const [selectedCity, setSelectedCity] = useState("");
  const [coordinat, setCoordinat] = useState({ lat: "", lon: "" });
  const [threeLocations, setThreeLocations] = useState([]);
  const [locationOnMap, setLocationOnMap] = useState({
    centerLat: 39.9273405,
    centerLon: 32.7717236,
  });

  return (
    <CityContext.Provider
      value={{
        state,
        dispatch,
        selectedCity,
        setSelectedCity,
        coordinat,
        setCoordinat,
        threeLocations,
        setThreeLocations,
        locationOnMap,
        setLocationOnMap,
      }}
    >
      {children}
    </CityContext.Provider>
  );
};

export const useCityContext = () => {
  return React.useContext(CityContext);
};
