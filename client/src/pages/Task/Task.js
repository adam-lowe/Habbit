import React from "react";
import { Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import AuthContext from '../../contexts/AuthContext';
import TaskForm from "../../components/TaskForm/TaskForm";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  taskContainer: {
    justifyContent: "center"
  }
}));

export default function Task() {
  const classes = useStyles();
  const { addTask } = React.useContext(AuthContext);
  const [state, setState] = React.useState({
    error: ""
  });

  const handleSubmit = (title, dueDate, description) => {
    addTask({ title, dueDate, description }).then(()=>(setState({ ...state, redirect: '/' })));
  };
  if (state.redirect) {
    return <Redirect to={{ pathname: state.redirect }} />;
  }
  return (
    <div className={classes.root}>
      <Grid container spacing={3} className={classes.taskContainer}>
        <Grid item xs={10} spacing={3}>
          <Paper className={classes.paper}>
            <TaskForm onSubmit={handleSubmit} />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
