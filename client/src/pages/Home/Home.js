import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import AuthContext from "../../contexts/AuthContext";
import PetStatus from "../../components/PetStatus/PetStatus";
import TaskList from "../../components/TaskList/TaskList";

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
  const { user } = useContext(AuthContext);
  const [health, setHealth] = useState(0);

  setTimeout(() => {
    if (user) setHealth(user.pet.health);
  }, 1000);

  const petDeathTimer = setInterval(() => {
    const pHealth = health - 5;
    setHealth(pHealth);
    if (health <= 0) {
      clearInterval(petDeathTimer);
    }
  }, 30000);

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <PetStatus health={health} />
        </Grid>
        <Grid item xs={12} md={8}>
          <TaskList />
        </Grid>
      </Grid>
    </div>
  );
}
