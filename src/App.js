import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import UsersList from './containers/user-list';
import Form from './containers/form';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
      <div>
        <Route exact path="/" component={UsersList} />
        <Route path="/edit/:userId" component={Form} />
        <Route path="/create" component={Form} /> 
      </div>
    </Router>
    );
  }
}

export default App;
