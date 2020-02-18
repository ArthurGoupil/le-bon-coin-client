import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import SearchBloc from '../components/SearchBloc';
import LineOffer from '../components/LineOffer';
import Pagination from '../components/Pagination';

const Offers = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [offersCount, setOffersCount] = useState();
  const { pageParams } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      let pageLink = `https://leboncoin-api.herokuapp.com/api/offer/with-count?skip=${(pageParams -
        1) *
        10}&limit=10`;
      try {
        const response = await axios.get(pageLink);
        setData(response.data);
        setOffersCount(response.data.count);
        setIsLoading(false);
      } catch (e) {
        console.error(e.message);
      }
    };
    fetchData();
  }, [pageParams]);

  return (
    <div className="offers d-flex flex-column align-center">
      <div className="offers-top d-flex flex-column align-center">
        <div className="orange-ellipse-container">
          <div className="orange-ellipse"></div>
        </div>
        <SearchBloc />
      </div>
      {!isLoading ? (
        <>
          {data.offers.map((offer, index) => {
            const offerLink = '/offer/' + offer._id;
            return (
              <Link key={index} to={offerLink}>
                <LineOffer {...offer}></LineOffer>
              </Link>
            );
          })}
          <Pagination offersCount={offersCount} pageParams={pageParams} />
        </>
      ) : (
        <span>En cours de chargement</span>
      )}
    </div>
  );
};

export default Offers;
