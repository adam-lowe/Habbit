import React, { useState, useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import API from "../../lib/API";
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
  const { user, completeTask, woundPet, authToken } = useContext(AuthContext);
  const [health, setHealth] = useState(0);
  const [tasks, setTasks] = useState(user ? user.todos : []);

  useEffect(() => {
    if (!user) {
      return
    } else {
      setHealth(user.pet.health);
      const petDeathTimer = setInterval(() => {
        const petDead = () => {
          console.log("congrats! your beloved pet is dead.")
          clearInterval(petDeathTimer)
        }
        woundPet().then((user)=>{
          setHealth(prevHealth => prevHealth <= 0 ? petDead() : user.pet.health);
        });
        
      }, 30000);
      return function cleanup() {
        clearInterval(petDeathTimer);
      };
    }
  }, [user, woundPet]);

  useEffect(() => {
    API.Users.getMe(authToken)
    .then(response => response.data)
    .then(user => {
      setTasks(user.todos);
      setHealth(user.pet.health);
    })
    .catch(error => console.log(error));
  }, [authToken]);

  const completeTaskClick = (event, taskId) => {
    event.preventDefault();
    completeTask(taskId).then((user) => {
      setTasks(user.todos);
    });
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <PetStatus health={health} />
        </Grid>
        <Grid item xs={12} md={8}>
          <TaskList tasks={tasks} taskClick={completeTaskClick} />
        </Grid>
      </Grid>
    </div>
  );
}
