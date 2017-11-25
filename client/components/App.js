import React, { Component } from "react";
import css from './app.scss';

import MainNav from "./MainNav";
import FlashMessagesList from "./FlashMessagesList";

class App extends Component {
  render() {
    return (
      <div className={css.app}>
        <MainNav />
        <FlashMessagesList />
        {this.props.children}
      </div>
    );
  }
}

export default App;
