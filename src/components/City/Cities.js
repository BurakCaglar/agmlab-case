import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import dataOfCity from "../../data/cities.json";
import { useCityContext } from "../../context/context";

const columns = [{ id: "name", label: "İl", minWidth: 170 }];

const useStyles = makeStyles({
  root: {
    width: "30%",
  },
  container: {
    maxHeight: 330,
  },
});

export default function Cities() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { setSelectedCity, setLocationOnMap } = useCityContext();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  /* GET UNIQUE CITIES */

  const allCities = dataOfCity.map((city) => city.city);
  const uniqueCities = [...new Set(allCities)];

  /* CITY NAME REMOVED FROM COUNTY LIST */

  const findCity = (cityName) => {
    const findCity = dataOfCity.find((city) => city.county === cityName);
    setLocationOnMap(findCity);
  };

  return (
    <Paper className={`${classes.root} city-table`}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {uniqueCities
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((city, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    {columns.map((column) => {
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          onClick={() => {
                            setSelectedCity(city);
                            findCity(city);
                          }}
                        >
                          {city}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={uniqueCities.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
