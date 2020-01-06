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
import TagFacesSharpIcon from '@material-ui/icons/TagFacesSharp';
import PetsSharpIcon from '@material-ui/icons/PetsSharp';

const useStyles = makeStyles(theme => ({
  button: {
    margin: "auto"
  },
  card: {
    minWidth: 275,
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

export default function RegistrationForm(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    email: "",
    password: "",
    passwordConfirm: ""
  });
  const handleInputChange = event => {
    const { name, value } = event.target;
    setState({
      ...state,
      [name]: value
    });
  };

  const handleSubmit = event => {
    const { email, password, passwordConfirm } = state;
    props.onSubmit(email, password, passwordConfirm);
    event.preventDefault();
  };
  return (
    <div className="RegistrationCard">
      <Card className={classes.card} variant="outlined">
        <form
          className={classes.form}
          autoComplete="off"
          noValidate
          onSubmit={handleSubmit}
        >
          <CardContent>
            <Typography
              className="RegistrationTitle"
              color="textSecondary"
              gutterBottom
            >
              Please Create an Account:
            </Typography>

            <Grid container spacing={3}>

            <Grid item xs={12}>
                <TextField
                  id="full-name-input"
                  name="FullName"
                  type="text"
                  value={state.name}
                  label="First and Last Name"
                  variant="filled"
                  onChange={handleInputChange}
                  className={classes.textField}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <TagFacesSharpIcon />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id="pet-name-input"
                  name="PetName"
                  type="text"
                  value={state.name}
                  label="What would you like to name your pet?"
                  variant="filled"
                  onChange={handleInputChange}
                  className={classes.textField}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PetsSharpIcon />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id="email-input"
                  name="email"
                  type="email"
                  value={state.email}
                  label="Email"
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
                  value={state.password}
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
              <Grid item xs={12}>
                <TextField
                  id="password-confirm-input"
                  name="passwordConfirm"
                  type="password"
                  value={state.passwordConfirm}
                  label="Confirm Password"
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
              Register
            </Button>
          </CardActions>
        </form>
      </Card>
    </div>
  );
}
