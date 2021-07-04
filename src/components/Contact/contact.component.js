import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Loader from '../Loader/loader.component';
import { Trans } from 'react-i18next';

import MessageService from "../../services/message.service";

import './contact.component.scss';

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        <Trans i18nKey="error.field.required"/>
      </div>
    );
  }
};

export default class Contact extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);

    this.onChangeUserName = this.onChangeUserName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeMessage = this.onChangeMessage.bind(this);

    this.state = {
      name: '',
      email: '',
      usermessage: '',
      message: '',
      loading: false
    };
  }
  
  onChangeUserName(event) {
    this.setState({name: event.target.value})
  }

  onChangeEmail(event) {
    this.setState({email: event.target.value})
  }

  onChangeMessage(event) {
    this.setState({usermessage: event.target.value})
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true
    });

    this.form.validateAll();
    if (this.checkBtn.context._errors.length === 0) {
      MessageService.send(this.state).then(
        response => {
          this.setState({
            message: response.data.message,
            successful: true,
            loading: false
          });
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            loading: false,
            message: resMessage
          });
        }
      );
    } else {
      this.setState({
        loading: false
      });
    }
  }

  render() {
    return (
      <div className="container">
        <header className="jumbotron">
          <h3><Trans i18nKey="contact.title"/></h3>
        </header>
        <Form
            onSubmit={this.handleSubmit}
            ref={c => {
              this.form = c;
            }}
          >
            <div className="form-group">
              <label htmlFor="name"><Trans i18nKey="label.username"/></label>
              <Input
                type="text"
                className="form-control"
                name="name"
                value={this.state.name}
                onChange={this.onChangeUserName}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email"><Trans i18nKey="label.email"/></label>
              <Input
                type="email"
                className="form-control"
                name="email"
                value={this.state.email}
                onChange={this.onChangeUserEmail}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="message"><Trans i18nKey="label.message"/></label>
              <Input
                type="text"
                className="form-control"
                name="message"
                value={this.state.usermessage}
                onChange={this.onChangeUserMessage}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <button
                className="btn btn-primary btn-block"
                disabled={this.state.loading}
              >
                {this.state.loading && (
                  //<span className="spinner-border spinner-border-sm"></span>
                  <Loader />
                )}
                <span><Trans i18nKey="input.submit"/></span>
              </button>
            </div>

            {this.state.message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {this.state.message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />
          </Form>
      </div>
    );
  }
}