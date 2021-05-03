import React, { useEffect } from "react";
import dataOfCity from "../../data/cities.json";
import { useCityContext } from "../../context/context";
import { Button, TextField } from "@material-ui/core";
import { closestLocation } from "../../helpers/helpers";

const Searchbar = () => {
  const [query, setQuery] = React.useState({ lat: "", lon: "" });
  const { coordinat, setCoordinat, setThreeLocations } = useCityContext();

  /* GET CLOSEST THREE CITIES&COUNTIES */

  let closest;

  if (coordinat.lat !== "" && coordinat.lon !== "") {
    closest = closestLocation(coordinat, dataOfCity).slice(0, 3);
  }

  /* USE EFFECT */
  useEffect(() => {
    setThreeLocations(closest);
  }, [coordinat]);

  /* SUBMIT QUERY */

  const submitQuery = async (e) => {
    e.preventDefault();
    setCoordinat({ ...coordinat, lat: query.lat, lon: query.lon });
    setQuery({ lat: "", lon: "" });
  };

  return (
    <form className="search-bar" onSubmit={(e) => submitQuery(e)}>
      <div className="input-group">
        <TextField
          inputProps={{ style: { textAlign: "center" } }}
          type="text"
          name="lat"
          value={query.lat || ""}
          onChange={(e) =>
            setQuery({ ...query, [e.target.name]: e.target.value })
          }
          label="latitude"
          style={{ marginRight: "5px" }}
        />

        <TextField
          inputProps={{ style: { textAlign: "center" } }}
          type="text"
          name="lon"
          value={query.lon || ""}
          onChange={(e) =>
            setQuery({ ...query, [e.target.name]: e.target.value })
          }
          label="longitude"
        />
      </div>
      <Button type="submit" variant="contained">
        Konumu Bul
      </Button>
    </form>
  );
};

export default Searchbar;
