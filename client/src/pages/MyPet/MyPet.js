import React, { useState, useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import API from "../../lib/API";
import AuthContext from "../../contexts/AuthContext";
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
  },
  petContainer: {
    justifyContent: "center"
  }
}));

export default function MyPet() {
  const classes = useStyles();
  const { user, woundPet, healPet, authToken } = useContext(AuthContext);
  const [health, setHealth] = useState(0);
  const [points, setPoints] = useState(0);
  const [error] = React.useState({ message: "" });
  
  useEffect(()=> {
    if (!user) {
      return
    } else {
      setHealth(user.pet.health);
      setPoints(user.points);
      const petDeathTimer = setInterval(() => {
        const petDead = () => {
          console.log("congrats! your beloved pet is dead.")
          clearInterval(petDeathTimer)
        }
        if (user.pet.health > 0) {
          woundPet().then((user)=>{
            setHealth(user.pet.health);
          });
        } else {
          petDead();
        }
      }, 60000);
      return function cleanup() {
        clearInterval(petDeathTimer);
      };
    }
  }, [user, woundPet])

  useEffect(() => {
    API.Users.getMe(authToken)
    .then(response => response.data)
    .then(user => {
      setPoints(user.points);
      setHealth(user.pet.health);
    })
    .catch(error => console.log(error));
  }, [authToken]);

  const healPetClick = (points) => {
    healPet(points).then(user => {
      setPoints(user.points)
      setHealth(user.pet.health)
    })
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
  
  return (
    <div className={classes.root}>
      <Grid container spacing={2} className={classes.petContainer}>
        <Grid item xs={12} sm={10}>
          <Paper className={classes.paper}>
            <PetStatus health={health} />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={10}>
          <Paper className={classes.paper}>
            <PetEnhancer
              points={points}
              handleInputChange={handleInputChange}
              onSubmit={() => (healPetClick(points))}
            />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
