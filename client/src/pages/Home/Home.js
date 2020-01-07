/**
 * This page will be used to show the user dashboard.
 *  * Convert these functions, so we can use hooks.
 * @todo: Link to state?
 * @todo: Make Components 
 */
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import AuthContext from '../../contexts/AuthContext';
import ErrorMsg from "../../components/ErrorMsg/ErrorMsg";
import PetStatus from '../../components/PetStatus/PetStatus';
import TaskList from '../../components/TaskList/TaskList';


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

  export default function Home() {
     const classes = useStyles();
     const authContext = React.useContext(AuthContext);
     const [state, setState] = React.useState({
       error: ""
     });
 
//   const handleSubmit = (title, dueDate, description) => {
//     const user = authContext.user;
//     user.todos.push({title, dueDate, description}); 
//     authContext.updateUser(user);
//   };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {/* {state.error && (
          <Grid item xs={12}>
            <ErrorMsg className={classes.margin} message={state.error} />
          </Grid>
        )} */}
        <Grid item xs={12} md={3}>
          <Paper className={classes.paper}>
            <PetStatus/>
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <TaskList/>
        </Grid>
      </Grid>
    </div>
  );
}
