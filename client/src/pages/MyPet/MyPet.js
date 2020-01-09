import React, { useState, useContext } from "react";
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
  const { user, updateUser } = useContext(AuthContext);
  const [health, setHealth] = useState(0);
  const [points, setPoints] = useState(0);
  const [error] = React.useState({ message: "" });

  setTimeout(() => {
    if (user) {
      setHealth(user.pet.health);
      setPoints(user.points);
    }
  }, 1000);

  const petDeathTimer = setInterval(() => {
    const pHealth = health - 5;
    setHealth(pHealth);
    if (health <= 0) {
      clearInterval(petDeathTimer);
    }
  }, 30000);

  const handleSubmit = () => {
    console.log(points);
    console.log(health);

    user.points -= points;
    user.pet.health = user.pet.health + points;
    updateUser(user);
    setHealth(user.pet.health);
    console.log(points);
    console.log(health);
  };

  const handleInputChange = event => {
    const { value } = event.target;
    if (value < 0) {
      return;
    } else if (value > user.points) {
      return;
    }
    setPoints(value);
  };
  if (!user) {
    return <div>Loading...</div>;
  }
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {error.message && (
          <Grid item xs={12}>
            <ErrorMsg className={classes.margin} message={error.message} />
          </Grid>
        )}
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <PetStatus health={health} />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <PetEnhancer
              points={points}
              handleInputChange={handleInputChange}
              onSubmit={handleSubmit}
            />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
