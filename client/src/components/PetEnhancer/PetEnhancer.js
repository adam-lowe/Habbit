import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import AuthContext from "../../contexts/AuthContext";

const useStyles = makeStyles(theme => ({
  button: {
    margin: 10
  },
  card: {
    minWidth: 275,
    margin: 20
  },
  form: {
    flexGrow: 1
  },
  textField: {
    width: "90%",
    margin: 15
  }
}));

export default function PetEnhancer(props) {
  const classes = useStyles();
  const { user } = useContext(AuthContext);
  return (
    <div className="PetEnhancer">
      <Card className={classes.card}>
        <Typography className="PointsTotal" color="textSecondary" gutterBottom>
          You have {user ? user.points : 0} points left
        </Typography>
        <CardContent>
          <form className="PetEnhancer">
            <TextField
              label="Feed"
              id="Feed"
              type="number"
              name="points"
              value={props.points}
              variant="filled"
              onChange={props.handleInputChange}
              className={classes.textField}
            />
            <Button
              className={classes.button}
              onClick={props.onSubmit}
              type="button"
              size="large"
              variant="outlined"
              color="primary"
            >
              Care For Pet
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
