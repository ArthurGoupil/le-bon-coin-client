import React from 'react';

import { useParams } from 'react-router-dom';
import BlocOffer from '../components/BlocOffer';

const Offer = () => {
  const { id } = useParams();

  return (
    <>
      <BlocOffer id={id}></BlocOffer>
    </>
  );
};

export default Offer;
