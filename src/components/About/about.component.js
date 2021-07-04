import React from "react";
import { Trans } from 'react-i18next';

import './about.component.scss';

export default class About extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="container">
        <header className="jumbotron">
          <h3><Trans i18nKey="about.title"></Trans></h3>
        </header>
      </div>
    );
  }
}