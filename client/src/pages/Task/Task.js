import React from "react";
import { Link, Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import API from "../../lib/API";
import ErrorMsg from "../../components/ErrorMsg/ErrorMsg";
import TaskForm from "../../components/TaskForm/TaskForm";

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

export default function Task() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    error: ""
  });
  //update below to accept new fields
  const handleSubmit = (title, dueDate, description) => {
  
    // API.Users.create(email, password)
    //   .then(response => response.data)
    //   .then(user => {
    //     console.log(user);
    //     setState({ error: "", redirectToLogin: true });
    //   })
    //   .catch(err => setState({ error: err.message, redirectToLogin: false }));
  };

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
            <TaskForm onSubmit={handleSubmit} />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
