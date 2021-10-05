import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './pages/home';

const App = () => (
  <Router>
    <Route exact path="/" component={HomePage} />
  </Router>
);

export default App;
