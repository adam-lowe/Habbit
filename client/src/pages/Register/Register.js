import React from "react";
import { Link, Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import API from "../../lib/API";
import ErrorMsg from "../../components/ErrorMsg/ErrorMsg";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  }
}));

export default function Register() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    error: "",
    redirectToLogin: false
  });
  //update below to accept new fields
  const handleSubmit = (fullName, petName, email, password, confirm) => {
    if (password !== confirm) {
      return setState({ error: "Passwords do not match." });
    }

    API.Users.create(fullName, petName, email, password)
      .then(response => response.data)
      .then(user => {
        console.log(user);
        setState({ error: "", redirectToLogin: true });
      })
      .catch(err => setState({ error: err.message, redirectToLogin: false }));
  };
  if (state.redirectToLogin) {
    return <Redirect to={{ pathname: "/login" }} />;
  }
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {state.error && (
          <Grid item xs={12}>
            <ErrorMsg className={classes.margin} message={state.error} />
          </Grid>
        )}
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <RegistrationForm onSubmit={handleSubmit} />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
