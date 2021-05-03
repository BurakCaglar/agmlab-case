import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useCityContext } from "../../context/context";
import { getDistanceFromLatLonInKm } from "../../helpers/helpers";

const useStyles = makeStyles({
  table: {
    maxWidth: 450,
  },
});

export default function ClosestLocations() {
  const classes = useStyles();
  const { threeLocations, coordinat, setLocationOnMap } = useCityContext();

  return (
    <>
      {threeLocations && (
        <TableContainer className={classes.table} component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Yerleşim Yeri</TableCell>
                <TableCell align="right">Mesafe</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {threeLocations &&
                threeLocations.map((location, index) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    <TableCell
                      component="th"
                      scope="row"
                      onClick={() => setLocationOnMap(location)}
                    >
                      {location.county}
                    </TableCell>
                    <TableCell align="right">
                      {getDistanceFromLatLonInKm(
                        location.centerLat,
                        location.centerLon,
                        coordinat.lat,
                        coordinat.lon
                      )}{" "}
                      km
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}
