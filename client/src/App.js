import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './pages/home';

function App() {
  return (
    <Router>
      <Route exact path="/columns" component={HomePage} />
    </Router>
  );
}

export default App;
