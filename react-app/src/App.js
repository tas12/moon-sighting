import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';

import Button from '@material-ui/core/Button';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <div className="navigation">
            <Button component={Link} to="/">Home</Button>
            <Button component={Link} to="/moon-sightings">Moon Sightings</Button>
            <Button component={Link} to="/report">Report a Sighting</Button>
            <Button component={Link} to="/guide">How to sight the moon</Button>
          </div>
          <Route path="/" exact render={() => <h2>The next new crescent moon will be on 8 November</h2>} />
          <Route path="/moon-sightings" component={Map} />
          <Route path="/report" component={MoonSightingForm} />
          <Route path="/guide" render={() => <p>stuff</p>} />
        </div>
      </Router>
    );
  }
}

export default App;
