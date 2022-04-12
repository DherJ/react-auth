import React, { Component } from "react";
import './error401.component.scss';

export default class Error401 extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="col-md-12">
        <div className="card card-container">
            <div className="alert alert-danger" role="alert">
                Error
            </div>
        </div>
    </div>
    );
  }
}