import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Grid from "@material-ui/core/Grid";
import EmailSharpIcon from "@material-ui/icons/EmailSharp";
import VpnKeySharpIcon from "@material-ui/icons/VpnKeySharp";

const useStyles = makeStyles(theme => ({
  button: {
    margin: "auto"
  },
  card: {
    minWidth: 275
  },
  form: {
    flexGrow: 1
  },
  textField: {
    width: "90%"
  },
  title: {
    fontSize: 14
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  }
}));

export default function LoginCard(props) {
  const classes = useStyles();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const handleInputChange = event => {
    const { name, value } = event.target;
    if (name === "email") {
      setEmail(value);
    }
    if (name === "password") {
      setPassword(value);
    }
  };
  const handleSubmit = event => {
    props.onSubmit(email, password);
    event.preventDefault();
  };

  return (
    <div className="LoginCard">
      <Card className={classes.card} variant="outlined">
        <form
          className={classes.form}
          autoComplete="off"
          noValidate
          onSubmit={handleSubmit}
        >
          <CardContent>
            <Typography
              className="LoginTitle"
              color="textSecondary"
              gutterBottom
            >
              Please Log In:
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  id="email-input"
                  name="email"
                  type="email"
                  value={email}
                  label="Username"
                  variant="filled"
                  onChange={handleInputChange}
                  className={classes.textField}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailSharpIcon />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id="password-input"
                  name="password"
                  type="password"
                  value={password}
                  label="Password"
                  variant="filled"
                  onChange={handleInputChange}
                  className={classes.textField}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <VpnKeySharpIcon />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Button
              className={classes.button}
              type="submit"
              size="large"
              variant="outlined"
              color="primary"
            >
              Log In
            </Button>
          </CardActions>
        </form>
      </Card>
    </div>
  );
}
