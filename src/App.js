import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Cookies from 'js-cookie';
import './App.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser, faPlusSquare } from '@fortawesome/free-regular-svg-icons';
import {
  faSearch,
  faCartPlus,
  faTimes
} from '@fortawesome/free-solid-svg-icons';

import Header from './components/Header';
import Offers from './pages/Offers';
import Offer from './pages/Offer';
import Footer from './components/Footer';
import ModalConnect from './components/ModalConnect';

library.add(faUser, faPlusSquare, faSearch, faCartPlus, faTimes);

const App = () => {
  const [displayModalConnect, setdisplayModalConnect] = useState(false);

  const tokenFromCookie = Cookies.get('userToken');
  let userState;
  if (tokenFromCookie) {
    userState = { token: tokenFromCookie };
  } else {
    userState = null;
  }
  const [user, setUser] = useState(userState);

  return (
    <div className={displayModalConnect ? 'scroll-off' : 'scroll-on'}>
      <Router>
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
        <Header
          setdisplayModalConnect={setdisplayModalConnect}
          user={user}
          setUser={setUser}
        />
        {displayModalConnect && (
          <ModalConnect
            setdisplayModalConnect={setdisplayModalConnect}
            setUser={setUser}
          />
        )}
      </Router>
    </div>
  );
};

export default App;
