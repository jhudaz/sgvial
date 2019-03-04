import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import UsersList from './containers/user-list';
import UserForm from './containers/user-form';

import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={UsersList} />
          <Route path="/edit/:userId" component={UserForm} />
          <Route path="/create" component={UserForm} />
        </div>
      </Router>
    );
  }
}

export default App;
