import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import { CircularProgress } from "@material-ui/core";
import Add from "./Add";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: "name", numeric: false, disablePadding: true, label: "Name" },
  {
    id: "birth_year",
    numeric: true,
    disablePadding: false,
    label: "Birth year",
  },
  { id: "gender", numeric: true, disablePadding: false, label: "Gender" },
  { id: "homeworld", numeric: true, disablePadding: false, label: "Homeworld" },
];

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
}));

const EnhancedTableToolbar = () => {
  const classes = useToolbarStyles();

  return <Toolbar className={classes.root}></Toolbar>;
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 420,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));

const People = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [people, setPeople] = useState([]);
  const [count, setCount] = useState(82);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("name");
  const [page, setPage] = React.useState(0);
  const ROWS_PER_PAGE = 10;
  const [filter, setFilter] = useState("");

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const getPeople = async (page) => {
    try {
      const res = await fetch(`https://swapi.dev/api/people/?page=${page}`);

      if (res.status === 404) {
        throw Error("Page not found");
      }

      return await res.json();
    } catch (error) {
      setError({
        header: "Error happened while fetching people",
        message: error.message,
      });
    }
  };

  useEffect(async () => {
    setLoading(true);
    const people = await getPeople(page + 1);

    if (!people) {
      setLoading(false);
      return;
    }

    setError(null);
    const peopleArray = people.results;
    setCount(people.count);

    setPeople(
      await Promise.all(
        peopleArray.map(async (person) => {
          const res = await fetch(person.homeworld);
          const data = await res.json();

          return {
            name: person.name,
            birth_year: person.birth_year,
            gender: person.gender,
            planet: data.name,
          };
        })
      )
    );
    setLoading(false);
  }, [page]);

  //Handle Search
  const onSearch = (value) => {
    setFilter(String(value).toLowerCase());
  };

  //Handle Add
  const onAdd = (hero) => {
    setPeople([...people, hero]);
  };

  return (
    <div
      style={{
        maxWidth: "800px",
        fontFamily: "mulish",
        margin: "100px auto",
        border: "1px solid #C4C4C4",
        borderRadius: "15px",
      }}
    >
      <h4
        style={{
          textAlign: "center",
          marginTop: "40px",
          fontSize: "34px",
          lineHeight: "43px",
          fontWeight: "400",
        }}
      >
        Star Wars
      </h4>

      <p
        style={{
          marginTop: "8px",
          textAlign: "center",
          fontWeight: "400",
          fontSize: "16px",
          lineHeight: "20px",
          letterSpacing: "0.15px",
        }}
      >
        Star wars heroes from swapi api
      </p>
      <div style={{ marginRight: "35px", marginLeft: "35px" }}>
        <div
          style={{
            marginBottom: "24px",
            display: "flex",
            alignItems: "flex-end",
            flexWrap: "wrap",
            justifyContent: "space-around",
          }}
        >
          <Add onAdd={onAdd} />
          <SearchBar onSearch={onSearch} />
        </div>

        <div style={{ marginBottom: "33px" }}>
          <div className={classes.root}>
            <Paper className={classes.paper}>
              <EnhancedTableToolbar />
              <TableContainer>
                <Table
                  className={classes.table}
                  aria-labelledby="tableTitle"
                  size="medium"
                  aria-label="enhanced table"
                >
                  <EnhancedTableHead
                    classes={classes}
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                    rowCount={people.length}
                  />
                  <TableBody>
                    {loading ? (
                      <TableRow style={{ height: 49.6 * ROWS_PER_PAGE }}>
                        <TableCell colSpan="4" align="center">
                          <img
                            src="https://www.baretreemedia.com/wp-content/uploads/2018/05/15_Stormtrooper_STOP_SA1.gif"
                            width="200px"
                          />
                        </TableCell>
                      </TableRow>
                    ) : (
                      stableSort(people, getComparator(order, orderBy))
                        .filter((person) => {
                          if (filter.length === 0) return true;
                          return Object.values(person).some((x) =>
                            String(x).toLowerCase().includes(filter)
                          );
                        })
                        .map((person, index) => {
                          const labelId = `enhanced-table-checkbox-${index}`;

                          return (
                            <TableRow tabIndex={-1} key={person.name}>
                              <TableCell component="th" id={labelId}>
                                {person.name}
                              </TableCell>
                              <TableCell align="right">
                                {person.birth_year}
                              </TableCell>
                              <TableCell align="right">
                                {person.gender}
                              </TableCell>
                              <TableCell align="right">
                                {person.planet}
                              </TableCell>
                            </TableRow>
                          );
                        })
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10]}
                component="div"
                count={count}
                rowsPerPage={ROWS_PER_PAGE}
                page={page}
                onChangePage={handleChangePage}
              />
            </Paper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default People;
