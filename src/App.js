import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Cookies from 'js-cookie';
import './App.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faUser,
  faPlusSquare,
  faClock,
  faBell,
  faEye
} from '@fortawesome/free-regular-svg-icons';
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
import SignUp from './components/SignUp';

library.add(
  faUser,
  faPlusSquare,
  faSearch,
  faCartPlus,
  faTimes,
  faClock,
  faBell,
  faEye
);

const App = () => {
  const [displayModalConnect, setDisplayModalConnect] = useState(false);

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
              <Route path="/sign-up">
                <SignUp setUser={setUser} />
              </Route>
              <Route path="/">
                <Offers></Offers>
              </Route>
            </Switch>
          </div>
        </main>
        <Footer />
        <Header
          setDisplayModalConnect={setDisplayModalConnect}
          user={user}
          setUser={setUser}
        />
        {displayModalConnect && (
          <ModalConnect
            setDisplayModalConnect={setDisplayModalConnect}
            setUser={setUser}
            onRequestClose={() => {
              setDisplayModalConnect(false);
            }}
            shouldCloseOnOverlayClick={false}
          />
        )}
      </Router>
    </div>
  );
};

export default App;
