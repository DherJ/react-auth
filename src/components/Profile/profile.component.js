import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Trans } from 'react-i18next';
import AuthService from "../../services/auth.service";

import './profile.component.scss';

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { username: "" }
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) this.setState({ redirect: "/home" });
    this.setState({ currentUser: currentUser, userReady: true })
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }

    const { currentUser } = this.state;

    return (
      <div className="container">
        {(this.state.userReady) ?
        <div>
        <header className="jumbotron">
          <h1>
            <strong>{currentUser.username}</strong> <Trans i18nKey="profile.title"/>
          </h1>
        </header>
        <p>
          <strong><Trans i18nKey="label.token"/>:</strong>{" "}
          {currentUser.accessToken.substring(0, 20)} ...{" "}
          {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
        </p>
        <p>
          <strong><Trans i18nKey="label.id"/>:</strong>{" "}
          {currentUser.id}
        </p>
        <p>
          <strong><Trans i18nKey="label.email"/>:</strong>{" "}
          {currentUser.email}
        </p>
        <strong><Trans i18nKey="label.authorities"/>:</strong>
        <ul>
          {currentUser.roles &&
            currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
        </ul>
      </div>: null}
      </div>
    );
  }
}