import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { teal, pink, purple } from "@material-ui/core/colors";
import Grid from "@material-ui/core/Grid";

import API from "../../lib/API";
import TokenStore from "../../lib/TokenStore";
import AuthContext from "../../contexts/AuthContext";

import Header from "../Header/Header";
import PrivateRoute from "../../components/PrivateRoute/PrivateRoute";
import Home from "../../pages/Home/Home";
import MyPet from "../../pages/MyPet/MyPet";
import Login from "../../pages/Login/Login";
import Register from "../../pages/Register/Register";
import Task from "../../pages/Task/Task";
import NotFound from "../../pages/NotFound/NotFound";

import "./App.css";

const siteTheme = createMuiTheme({
  palette: {
    primary: teal,
    secondary: purple,
    text: {
      primary: "#000",
      secondary: "#000"
    }
  },
  shape: {
    borderRadius: 12
  }
});

export default class App extends Component {
  constructor(props) {
    super(props);

    this.updateUser = user => {
      return API.Users.updateMe(this.state.auth.authToken, user)
        .then(response => response.data)
        .then(newUser => {
          this.setState(prevState => {
            prevState.auth.user = newUser;
            return { auth: { ...prevState.auth } };
          });
          return this.state.auth.user;
        })
        .catch(err => console.log(err));
    };

    this.addTask = task => {
      return API.Tasks.createOne(this.state.auth.authToken, task)
        .then(response => response.data)
        .then(newUser => {
          this.setState(prevState => {
            prevState.auth.user = newUser;
            return { auth: { ...prevState.auth } };
          });
          return this.state.auth.user;
        })
        .catch(err => console.log(err));
    };

    this.completeTask = taskId => {
      return API.Tasks.completeOne(this.state.auth.authToken, taskId)
        .then(response => response.data)
        .then(newUser => {
          this.setState(prevState => {
            prevState.auth.user = newUser;
            return { auth: { ...prevState.auth } };
          });
          return this.state.auth.user;
        })
        .catch(err => console.log(err));
    };

    this.woundPet = taskId => {
      return API.Pets.wound(this.state.auth.authToken)
        .then(response => response.data)
        .then(newUser => {
          this.setState(prevState => {
            prevState.auth.user = newUser;
            return { auth: { ...prevState.auth } };
          });
          return this.state.auth.user;
        })
        .catch(err => console.log(err));
    };

    this.healPet = points => {
      return API.Pets.heal(this.state.auth.authToken, points)
        .then(response => response.data)
        .then(newUser => {
          this.setState(prevState => {
            prevState.auth.user = newUser;
            return { auth: { ...prevState.auth } };
          });
          return this.state.auth.user;
        })
        .catch(err => console.log(err));
    };

    this.handleLogin = (user, authToken) => {
      TokenStore.setToken(authToken);
      this.setState(prevState => ({
        auth: { ...prevState.auth, user, authToken }
      }));
    };

    this.handleLogout = authToken => {
      API.Users.logout(authToken);
      TokenStore.clearToken();
      this.setState(prevState => ({
        auth: { ...prevState.auth, user: undefined, authToken: undefined }
      }));
    };
    this.state = {
      auth: {
        user: undefined,
        authToken: TokenStore.getToken(),
        updateUser: this.updateUser,
        addTask: this.addTask,
        completeTask: this.completeTask,
        woundPet: this.woundPet,
        healPet: this.healPet,
        onLogin: this.handleLogin,
        onLogout: this.handleLogout
      }
    };
  }

  componentDidMount() {
    const { authToken } = this.state.auth;
    if (!authToken) return;

    API.Users.getMe(authToken)
      .then(response => response.data)
      .then(user =>
        this.setState(prevState => ({ auth: { ...prevState.auth, user } }))
      )
      .catch(err => console.log(err));
  }

  render() {
    return (
      <ThemeProvider theme={siteTheme}>
        <AuthContext.Provider value={this.state.auth}>
            <Grid
              container
              direction="column"
              className="app"
            >
              <Grid item className="header">
                {/* Header */}
                <Header logout={this.handleLogout} />
              </Grid>
              <Grid item className="main">
                {/* Pages/Views */}
                <Switch>
                  {/* Dashboard */}
                  <PrivateRoute exact path="/" component={Home} />
                  {/* Login */}
                  <Route path="/login" component={Login} />
                  {/* User Registration */}
                  <Route path="/register" component={Register} />
                  {/* Create Task */}
                  <PrivateRoute path="/task" component={Task} />
                  {/* Edit Task */}
                  <PrivateRoute path="/task/:id" component={Task} />
                  {/* Pet Dashboard */}
                  <PrivateRoute path="/my-pet" component={MyPet} />
                  <Route component={NotFound} />
                </Switch>
              </Grid>
            </Grid>
        </AuthContext.Provider>
      </ThemeProvider>
    );
  }
}
