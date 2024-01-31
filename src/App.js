import React, { useContext, useState, useEffect } from "react";
import axios from 'axios';

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
import PetsList from "./components/Pets/pets.component";
import Error401 from "./components/Errors/401/error401.component";

import { ThemeContext } from "./Theme";

axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  if(error.response.status === 401) {
    AuthService.logout();
    window.location = "/login";
  }
  return error;
});

function App() {

  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);
  const { theme } = useContext(ThemeContext);

  const user = AuthService.getCurrentUser();

  // useEffect(() => {
  //   if (user) {
  //       setCurrentUser(user);
  //       setShowModeratorBoard(true);
  //       //setShowAdminBoard(user.roles.includes("ADMIN"));
  //   }
  // }, [user]);

    return (
      <>
        <div className={`App ${theme}`}>
          <NavBar currentUser={currentUser} showModeratorBoard={showModeratorBoard} showAdminBoard={showAdminBoard}/>

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
              <Route exact path="/pets" component={PetsList} />
              <Route exact path="/401" component={Error401} />
            </Switch>
          </div>
        </div>
      </>
    );
}

export default App;