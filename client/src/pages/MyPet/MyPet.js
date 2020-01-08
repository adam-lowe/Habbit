import React from "react";
import { Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import AuthContext from "../../contexts/AuthContext";
import ErrorMsg from "../../components/ErrorMsg/ErrorMsg";
import PetStatus from "../../components/PetStatus/PetStatus";
import PetEnhancer from "../../components/PetEnhancer/PetEnhancer";

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

export default function MyPet() {
  const classes = useStyles();
  const authContext = React.useContext(AuthContext);
  const [state, setState] = React.useState({
    error: ""
  });

  const handleSubmit = (points) => {
    const { user } = authContext;
    user.points -= points;
    user.pet.health =user.pet.health +  Number.parseInt(points);
    authContext.updateUser(user);
  };

  if (!authContext.user) {
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
            <PetStatus />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <PetEnhancer onSubmit={handleSubmit} />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
