import React, { useState } from 'react';
import Moment from 'react-moment';
import defaultImage from '../assets/images/default-image.jpg';

const LineOffer = ({ title, pictures, price, created }) => {
  const [src, setSrc] = useState(pictures[0]);
  return (
    <div className="line-offer d-flex">
      <div className="line-offer-img">
        {pictures[0] ? (
          <img
            alt={title}
            src={src}
            onError={() => {
              return setSrc(defaultImage);
            }}
          />
        ) : (
          <img alt="{title} default" src={defaultImage} />
        )}
      </div>
      <div className="line-offer-text d-flex flex-column space-between">
        <div className="d-flex flex-column">
          <span className="line-offer-title">{title}</span>
          {price && <span className="line-offer-price">{price}&nbsp;€</span>}
        </div>
        <span className="is-16">
          <Moment format="DD/MM/YYYY à HH:mm">{created}</Moment>
        </span>
      </div>
    </div>
  );
};

export default LineOffer;
