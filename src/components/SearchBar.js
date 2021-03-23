import React from "react";
import { Toolbar, TextField } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { fade, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  searchContainer: {
    display: "flex",
    backgroundColor: fade(theme.palette.common.white, 0.15),
    paddingLeft: "20px",
    paddingRight: "20px",
    marginBottom: "5px",
  },
  searchIcon: {
    alignSelf: "flex-end",
    marginBottom: "5px",
  },
  searchInput: {
    maxWidth: "133px",
    margin: "5px",
  },
}));

const SearchBar = ({ onSearch }) => {
  const classes = useStyles();

  const handleSearchChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <Toolbar>
      <div className={classes.searchContainer}>
        <SearchIcon className={classes.searchIcon} />
        <TextField
          onChange={handleSearchChange}
          label="Search Hero"
          className={classes.searchInput}
        />
      </div>
    </Toolbar>
  );
};

export default SearchBar;
