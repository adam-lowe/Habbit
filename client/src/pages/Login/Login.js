import React from "react";
import { Link, Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import API from "../../lib/API";
import AuthContext from "../../contexts/AuthContext";
import LoginCard from "../../components/LoginCard/LoginCard";
import ErrorMsg from "../../components/ErrorMsg/ErrorMsg";

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

export default function Login(props) {
  const auth = React.useContext(AuthContext);
  const classes = useStyles();
  const [state, setState] = React.useState({
    redirectToReferrer: false,
    error: ""
  });

  const handleSubmit = (email, password) => {
    API.Users.login(email, password)
      .then(response => response.data)
      .then(({ user, token }) => {
        auth.onLogin(user, token);
        setState({ redirectToReferrer: true, error: "" });
      })
      .catch(err => {
        let message;

        switch (err.response.status) {
          case 401:
            message =
              "Sorry, that email/password combination is not valid. Please try again.";
            break;
          case 500:
            message = "Server error. Please try again later.";
            break;
          default:
            message = "Unknown error.";
        }

        setState({ redirectToReferrer: false, error: message });
      });
  };
  const { from } = props.location.state || {
    from: { pathname: "/" }
  };
  const { redirectToReferrer } = state;

  if (redirectToReferrer) {
    return <Redirect to={from} />;
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
            <LoginCard onSubmit={handleSubmit} />
            <div className="registerlink">
              Don't have an account?{" "}
              <Link to="/register">Click here to register.</Link>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
