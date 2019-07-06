import React, { Component, useState } from 'react';
import { AppBar, Tabs, Tab } from '@material-ui/core';
import Link from '../../../../material/Link';
import './css/Header.scss';

class Header extends Component {
  state = { value: 0 } as any;

  handleChange = (event: any, newValue: number) => {
    this.setState({
      value: newValue
    });
  };

  render() {
    const { value } = this.state;

    return (
      <div className="layout-header">
        <AppBar position="static" color="default">
          <div className="title-page">DATA GATEWAY</div>

          <div className="nav">
            <Link activeClassName="active" href="/" color="primary">
              <span>Review</span>
            </Link>
            <Link activeClassName="active" href="/request" color="primary">
              <span>Request</span>
            </Link>
            <Link activeClassName="active" href="/manage" color="primary">
              <span>Manage</span>
            </Link>
          </div>
        </AppBar>
      </div>
    );
  }
}

export default Header;
