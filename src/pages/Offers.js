import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Search from '../components/Search';
import LineOffer from '../components/LineOffer';

const Offers = props => {
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
    <div className="offers d-flex flex-column align-center">
      <div className="offers-top d-flex flex-column align-center">
        <div className="orange-ellipse-container">
          <div className="orange-ellipse"></div>
        </div>
        <Search />
      </div>
      {!isLoading ? (
        data.offers.map((offer, index) => {
          const offerLink = '/offer/' + offer._id;
          return (
            <Link key={index} to={offerLink}>
              <LineOffer {...offer}></LineOffer>
            </Link>
          );
        })
      ) : (
        <span>En cours de chargement</span>
      )}
    </div>
  );
};

export default Offers;
