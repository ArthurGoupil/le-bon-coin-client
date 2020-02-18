import React, { useState } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import axios from 'axios';

const CheckoutForm = ({ stripe }) => {
  const [complet, setComplete] = useState(false);

  return (
    <>
      <span>test</span>
    </>
  );
};

export default injectStripe(CheckoutForm);
