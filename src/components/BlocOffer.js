import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Moment from 'react-moment';
import nl2br from 'react-nl2br';
import Carousel from 'nuka-carousel';
import { useHistory } from 'react-router-dom';

const BlocOffer = ({ id }) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();
  useEffect(() => {
    const offerLink = 'https://le-bon-coin-reacteur.herokuapp.com/offer/' + id;
    const fetchData = async () => {
      try {
        const response = await axios.get(offerLink);
        setData(response.data.offer);
        setIsLoading(false);
      } catch (e) {
        console.error(e.message);
      }
    };
    fetchData();
  }, [id]);

  console.log(data);

  return (
    <>
      {!isLoading ? (
        <div className="bloc-offer d-flex">
          <div className="bloc-offer-container">
            <div>
              {data.pictures.length > 1 ? (
                <Carousel
                  wrapAround={true}
                  renderCenterLeftControls={({ previousSlide }) => (
                    <button
                      className="d-flex justify-center align-center button-carousel"
                      onClick={previousSlide}
                    >
                      <FontAwesomeIcon icon={['fas', 'chevron-left']} />
                    </button>
                  )}
                  renderCenterRightControls={({ nextSlide }) => (
                    <button
                      className="d-flex justify-center align-center button-carousel"
                      onClick={nextSlide}
                    >
                      <FontAwesomeIcon icon={['fas', 'chevron-right']} />
                    </button>
                  )}
                >
                  {data.pictures.map((picture, index) => {
                    return (
                      <div key={index} className="bloc-offer-img-container">
                        <img
                          className="bloc-offer-img"
                          alt={data.title}
                          src={data.pictures[index]}
                        />
                      </div>
                    );
                  })}
                </Carousel>
              ) : (
                <div className="bloc-offer-img-container">
                  <img
                    className="bloc-offer-img"
                    alt={data.title}
                    src={data.pictures[0]}
                  />
                </div>
              )}
            </div>
            <div className="bloc-offer-infos d-flex flex-column space-between">
              <div>
                <h2 className="bloc-offer-infos-title">{data.title}</h2>
                <div className="is-20 is-orange">{data.price}&nbsp;€</div>
              </div>
              <div className="is-16">
                <Moment format="DD/MM/YYYY à HH:mm">{data.created}</Moment>
              </div>
            </div>
            <div className="bloc-offer-description is-19">
              <h3>Description</h3>
              {nl2br(data.description)}
            </div>
          </div>
          <aside className="bloc-offer-user">
            <div className="bloc-offer-user-padding d-flex flex-column">
              <Link to="#" className="bloc-offer-user-username is-23 is-bld">
                {data.creator.account.username}
              </Link>
              <Link to="#" className="is-19 is-bld is-blue is-blue">
                {Math.floor(Math.random() * 100)} annonces en ligne
              </Link>
            </div>
            <hr></hr>
            <div className="bloc-offer-user-padding">
              <button
                className="bloc-offer-user-button orange-button-hover is-16 is-bld"
                onClick={() => {
                  history.push(`/offer/${id}/payment`, {
                    title: data.title,
                    price: data.price,
                    picture: data.pictures[0],
                    username: data.creator.account.username
                  });
                }}
              >
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

export default BlocOffer;
