import React from "react";
import Cities from "./Cities";
import District from "../District/District";
import ClosestLocations from "../Search/ClosestLocations";
import Searchbar from "../Search/Searchbar";

const CityList = () => {
  return (
    <section
      className="container container-center city-list animate "
      style={{ paddingBottom: "0" }}
    >
      <Cities />
      <District />
      <div className="search">
        <Searchbar />
        <ClosestLocations />
      </div>
    </section>
  );
};

export default CityList;
