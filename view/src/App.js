import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Main from './pages/Main';
import Saved from './pages/Saved';
import Err from './pages/Err';

function App() {
  return (
    <Fragment>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/saved" component={Saved} />
          <Route component={Err} />
        </Switch>
        <Footer />
      </Router>
    </Fragment>
  );
}

export default App;
