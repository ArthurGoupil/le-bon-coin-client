import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser, faPlusSquare } from '@fortawesome/free-regular-svg-icons';
import { faSearch, faCartPlus } from '@fortawesome/free-solid-svg-icons';

import Header from './components/Header';
import Offers from './pages/Offers';
import Offer from './pages/Offer';
import Footer from './components/Footer';

library.add(faUser, faPlusSquare, faSearch, faCartPlus);

const App = () => {
  return (
    <Router>
      <Header />
      <main>
        <div className="main-container d-flex align-center flex-column">
          <Switch>
            <Route path="/offer/:id">
              <Offer></Offer>
            </Route>
            <Route path="/">
              <Offers></Offers>
            </Route>
          </Switch>
        </div>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
