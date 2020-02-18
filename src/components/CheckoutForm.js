import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { CardElement, injectStripe } from 'react-stripe-elements';
import axios from 'axios';

const CheckoutForm = ({ stripe }) => {
  const [complete, setComplete] = useState(false);
  const location = useLocation();
  const { title, price, picture, username } = location.state;

  return !complete ? (
    <div>
      <h2>Acheter en ligne</h2>
      <div className="bloc-offer-img-container">
        <img className="bloc-offer-img" alt={title} src={picture} />
      </div>
      <h3>{title}</h3>
      <span>{price}&nbsp;€</span>
      <h3>Vos coordonnées bancaires</h3>
      <div className="card-element">
        <CardElement />
        <button
          onClick={async event => {
            try {
              const stripeResponse = await stripe.createToken({
                name: username
              });
              console.log('stripeResponse.token', stripeResponse.token);
              const paymentResponse = await axios.post(
                'http://localhost:3001/pay',
                { token: stripeResponse.token.id }
              );
              console.log('paymentResponse', paymentResponse);
              if (paymentResponse.status === 200) {
                setComplete(true);
              } else {
                alert('An error occurred');
                console.error(paymentResponse);
              }
            } catch (e) {
              console.error(e.message);
            }
          }}
        >
          Valider
        </button>
      </div>
    </div>
  ) : (
    <span>Achat effectué ! Merci pour votre confiance.</span>
  );
};

export default injectStripe(CheckoutForm);
