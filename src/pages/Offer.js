import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Moment from 'react-moment';

import { useParams, Link } from 'react-router-dom';

const Offer = props => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const offerLink = 'https://leboncoin-api.herokuapp.com/api/offer/' + id;
    const fetchData = async () => {
      try {
        const response = await axios.get(offerLink);
        setData(response.data);
        setIsLoading(false);
      } catch (e) {
        console.error(e.message);
      }
    };
    fetchData();
  }, [id]);

  return (
    <>
      {!isLoading ? (
        <div className="box-offer d-flex">
          <div className="box-offer-container">
            <div className="box-offer-img">
              <img alt={data.title} src={data.pictures[0]} />
            </div>
            <div className="box-offer-infos d-flex flex-column space-between">
              <div>
                <div className="box-offer-infos-title">{data.title}</div>
                <div className="is-20 is-orange">{data.price}&nbsp;€</div>
              </div>
              <div className="is-16">
                <Moment format="DD/MM/YYYY à HH:mm">{data.created}</Moment>
              </div>
            </div>
          </div>
          <aside className="box-offer-user">
            <div className="box-offer-user-padding d-flex flex-column">
              <Link to="#" className="box-offer-user-username is-23 is-bld">
                {data.creator.account.username}
              </Link>
              <Link to="#" className="is-19 is-bld is-blue is-blue">
                {Math.floor(Math.random() * 100)} annonces en ligne
              </Link>
            </div>
            <hr></hr>
            <div className="box-offer-user-padding">
              <button className="box-offer-user-button orange-button-hover is-16 is-bld">
                <FontAwesomeIcon
                  className="icon-cart-plus"
                  icon={['fas', 'cart-plus']}
                />
                Acheter
              </button>
            </div>
          </aside>
        </div>
      ) : (
        <span>En cours de chargement</span>
      )}
    </>
  );
};

export default Offer;
