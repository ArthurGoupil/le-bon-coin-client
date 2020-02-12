import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import axios from 'axios';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser, faPlusSquare } from '@fortawesome/free-regular-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import Header from './components/Header';
import Offers from './pages/Offers';
import Offer from './pages/Offer';

library.add(faUser, faPlusSquare, faSearch);

const App = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        'https://leboncoin-api.herokuapp.com/api/offer/with-count'
      );
      setData(response.data);
      setIsLoading(false);
    } catch (e) {
      console.error(e.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Router>
      <Header />
      {!isLoading ? (
        <main>
          <div className="main-container d-flex justify-center">
            <Switch>
              <Route path="/offer/">
                <Offer></Offer>
              </Route>
              <Route path="/">
                <Offers></Offers>
              </Route>
            </Switch>
          </div>
        </main>
      ) : (
        <div>En cours de chargement...</div>
      )}
    </Router>
  );
};

export default App;
