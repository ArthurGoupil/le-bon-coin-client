import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Elements, StripeProvider } from 'react-stripe-elements';
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
  faTimes,
  faChevronLeft,
  faChevronRight,
  faCamera
} from '@fortawesome/free-solid-svg-icons';

import Header from './components/Header';
import Footer from './components/Footer';
import ModalConnect from './components/ModalConnect';
import CheckoutForm from './components/CheckoutForm';

import Offers from './pages/Offers';
import Offer from './pages/Offer';
import SignUp from './pages/SignUp';
import Publish from './pages/Publish';
import Search from './pages/Search';
import Home from './pages/Home';
import Payment from './pages/Payment';

library.add(
  faUser,
  faPlusSquare,
  faSearch,
  faCartPlus,
  faTimes,
  faClock,
  faBell,
  faEye,
  faChevronLeft,
  faChevronRight,
  faCamera
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
              <Route path="/offers/search=:search">
                <Search />
              </Route>
              <Route path="/offers/page=:pageParams">
                <Offers />
              </Route>
              <StripeProvider
                path="/offer/:id/payment"
                exact
                apiKey="pk_test_3wCBGY9I5ld0aq265YrTOKn100EuFn0tg4"
              >
                <Elements>
                  <Payment></Payment>
                </Elements>
              </StripeProvider>
              <Route path="/offer/publish">
                <Publish
                  user={user}
                  setDisplayModalConnect={setDisplayModalConnect}
                />
              </Route>
              <Route path="/offer/:id">
                <Offer />
              </Route>
              <Route path="/sign-up">
                <SignUp setUser={setUser} />
              </Route>
              <Route path="/">
                <Home />
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
          />
        )}
      </Router>
    </div>
  );
};

export default App;
