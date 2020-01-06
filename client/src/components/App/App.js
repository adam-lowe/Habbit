import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import API from '../../lib/API';
import TokenStore from '../../lib/TokenStore';
import AuthContext from '../../contexts/AuthContext';

import Header from '../Header/Header';
import PrivateRoute from '../../components/PrivateRoute/PrivateRoute';
import Home from '../../pages/Home/Home';
import PetDashboard from '../../pages/Dashboard/Dashboard';
import Login from '../../pages/Login/Login';
import Register from '../../pages/Register/Register';
import Task from '../../pages/Task/Task';
import Secret from '../../pages/Secret/Secret';
import NotFound from '../../pages/NotFound/NotFound';

import './App.css';
/**
 * @todo Handle page title change.
 * @todo
 */
class App extends Component {
  constructor(props) {
    super(props);

    this.handleLogin = (user, authToken) => {
      TokenStore.setToken(authToken);
      this.setState(prevState => ({ auth: { ...prevState.auth, user, authToken } }));
    };

    this.handleLogout = () => {
      TokenStore.clearToken();
      this.setState(prevState => ({ auth: { ...prevState.auth, user: undefined, authToken: undefined } }));
    }
    /* This will be used when user is hooked up to back-end. Just uncomment this code and delete or commment the code immediately below this comment.
        this.state = {
          auth: {
            user: {
          email: "me@abc.com",
          name: "Jane Doe",
          pet: {},
          task: [],
        },
        authToken: "4KAOSDFJ2454509JDF2",
            user: undefined,
            authToken: TokenStore.getToken(),
            onLogin: this.handleLogin,
            onLogout: this.handleLogout
          }
        }
        */
    this.state = {
      auth: {
        user: undefined,
        onLogin: this.handleLogin,
        onLogout: this.handleLogout
      }
    }
  }

  componentDidMount() {
    const { authToken } = this.state.auth;
    if (!authToken) return;

    API.Users.getMe(authToken)
      .then(response => response.data)
      .then(user => this.setState(prevState => ({ auth: { ...prevState.auth, user } })))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <AuthContext.Provider value={this.state.auth}>
        <div className='App'>
          {/* Header */}
          <Header />
          {/* Pages/Views */}
          <div className='container'>
            <Switch>
              {/* Dashboard - Make Last 
                  This route will need to be a private route when the user stuff is hooked up. While building the views, however, we can use dummy/static data in each component and build from there.
                    REMOVE THIS WHEN ROUTE IS COMPLETED
              */}
              <Route exact path='/' component={Home} />
              {/* Login */}
              <Route path='/login' component={Login} />
              {/* User Registration */}
              <Route path='/register' component={Register} />
              {/* Create Task
                  This route will need to be a private route when the user stuff is hooked up. While building the views, however, we can use dummy /static data in each component and build from there.
                    REMOVE THIS WHEN ROUTE IS COMPLETED
               */}
              <Route path='/task' component={Task} />
              {/* Edit Task
                  This route will need to be a private route when the user stuff is hooked up. While building the views, however, we can use dummy /static data in each component and build from there.
                    REMOVE THIS WHEN ROUTE IS COMPLETED
               */}
              <Route path='/task/:id' component={Task} />
              {/* Pet Dashboard 
                  This route will need to be a private route when the user stuff is hooked up. While building the views, however, we can use dummy /static data in each component and build from there.
                    REMOVE THIS WHEN ROUTE IS COMPLETED
              */}
              <Route path='/my-pet' component={PetDashboard} />
              {/* Dummy Route
                  Use to test authentication. Can be deleted after. Provides example of private route creation
                    REMOVE THIS WHEN ROUTE IS COMPLETED
              */}
              <PrivateRoute path='/secret' component={Secret} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </div>
      </AuthContext.Provider>
    );
  }
}

export default App;
