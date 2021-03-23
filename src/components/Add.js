import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Input from "@material-ui/core/Input";
import FormLabel from "@material-ui/core/FormLabel";
import { TextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

const Add = ({ onAdd }) => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    onAdd({
      name: e.target.name.value,
      birth_year: e.target.year.value,
      gender: e.target.gender.value,
      planet: e.target.planet.value,
    });
    setOpen(false);
  };

  const classes = useStyles();
  return (
    <div>
      <Button
        onClick={handleOpen}
        variant="contained"
        size="large"
        style={{
          backgroundColor: "black",
          color: "white",
          background: "#1E283B",
        }}
        className={classes.margin}
      >
        Add new
      </Button>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 style={{ textAlign: "center" }} id="transition-modal-title">
              Add your Hero!
            </h2>
            <form
              autoComplete="off"
              onSubmit={onSubmit}
              style={{
                maxWidth: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <TextField
                label="Name"
                variant="outlined"
                required
                name="name"
              ></TextField>
              <br></br>
              <TextField
                label="Birth Year"
                variant="outlined"
                required
                name="year"
              ></TextField>
              <br></br>
              <TextField
                label="Gender"
                variant="outlined"
                required
                name="gender"
              ></TextField>
              <br></br>
              <TextField
                label="Planet"
                variant="outlined"
                required
                name="planet"
              ></TextField>
              <br></br>
              <Button
                type="submit"
                variant="contained"
                size="medium"
                style={{ background: "#1E283B", color: "white" }}
                className={classes.margin}
              >
                Create Hero!
              </Button>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default Add;
