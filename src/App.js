import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import AuthService from "./services/auth.service";

import Login from "./components/Login/login.component";
import Register from "./components/Register/register.component";
import Home from "./components/home.component";
import Profile from "./components/Profile/profile.component";
import BoardUser from "./components/Board/board-user.component";
import BoardModerator from "./components/Board/board-moderator.component";
import BoardAdmin from "./components/Board/board-admin.component";
import NavBar from "./components/NavBar/navbar.component";
import About from "./components/About/about.component";
import Contact from "./components/Contact/contact.component";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("MODERATOR"),
        showAdminBoard: user.roles.includes("ADMIN"),
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {

    return (
        <div>
          <NavBar currentUser={this.state.currentUser} showModeratorBoard={this.state.showModeratorBoard} showAdminBoard={this.state.showAdminBoard}/>

          <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/home"]} component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/profile" component={Profile} />
              <Route path="/user" component={BoardUser} />
              <Route path="/mod" component={BoardModerator} />
              <Route path="/admin" component={BoardAdmin} />
              <Route path="/about" component={About} />
              <Route path="/contact" component={Contact} />
            </Switch>
          </div>
        </div>
    );
  }
}

export default App;