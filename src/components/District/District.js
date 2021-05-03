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

const columns = [{ id: "name", label: "İlçe", minWidth: 170 }];

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
  const { selectedCity, setLocationOnMap } = useCityContext();

  /* SELECTED CITY LIST */

  const selectedCityList = dataOfCity.filter(
    (city) => city.city === selectedCity
  );

  /* SELECTED COUNTY LIST */

  const selectedCountyList = selectedCityList.filter(
    (county) => county.county !== county.city
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper
      className={`${classes.root} county-table `}
      style={
        selectedCountyList.length > 0
          ? { visibility: "visible" }
          : { visibility: "hidden" }
      }
    >
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
            {selectedCountyList
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((city, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    {columns.map((column) => {
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          onClick={() => setLocationOnMap(city)}
                        >
                          {city.county}
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
        count={selectedCountyList.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
