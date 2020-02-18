import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ModalConnect = ({ setDisplayModalConnect, setUser }) => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const history = useHistory();
  const handleEmailChange = event => {
    const value = event.target.value;
    setEmail(value);
  };
  const handlePasswordChange = event => {
    const value = event.target.value;
    setPassword(value);
  };
  const handleSubmit = async event => {
    event.preventDefault();
    if (email === '' && password === '') {
      setErrorMessage(
        'Veuillez renseigner votre adresse email et votre mot de passe.'
      );
    } else if (email === '') {
      setErrorMessage('Veuillez renseigner votre adresse email.');
    } else if (password === '') {
      setErrorMessage('Veuillez renseigner votre mot de passe.');
    } else {
      try {
        const response = await axios.post(
          'https://le-bon-coin-reacteur.herokuapp.com/user/log_in',
          {
            email,
            password
          }
        );
        Cookies.set('userToken', response.data.token, { expires: 30 });
        setUser({ token: response.data.token });
        setDisplayModalConnect(false);
        setErrorMessage(null);
        history.push('/');
      } catch (e) {
        setErrorMessage('Adresse email ou mot de passe incorrect.');
        console.error(e.message);
      }
    }
  };

  return (
    <>
      <div
        id="modal-connect-id"
        className="modal-connect d-flex justify-center align-center"
        onClick={event => {
          if (
            event.target.className ===
            'modal-connect d-flex justify-center align-center'
          ) {
            setDisplayModalConnect(false);
          }
        }}
      >
        <div className="modal-connect-box">
          <div className="modal-connect-box-top">
            <h2 className="modal-connect-box-title is-centered">Connexion</h2>
            <form
              className="d-flex flex-column align-center"
              onSubmit={handleSubmit}
            >
              <label htmlFor="email">Adresse email</label>
              <input
                name="email"
                type="email"
                value={email}
                onChange={handleEmailChange}
              />
              <label htmlFor="password">Mot de passe</label>
              <input
                name="password"
                type="password"
                value={password}
                onChange={handlePasswordChange}
              />
              <input
                className="modal-connect-box-submit is-bld is-16"
                name="submit"
                type="submit"
                value="Se connecter"
              />
              <span>{errorMessage}</span>
            </form>
          </div>
          <div className="modal-connect-box-bottom">
            <div className="is-16 is-bld">Vous n'avez pas de compte ?</div>
            <Link
              className="modal-connect-box-bottom-sign-up d-flex justify-center align-center is-bld is-16"
              to="/sign-up"
              onClick={() => {
                setDisplayModalConnect(false);
              }}
            >
              Créer un compte
            </Link>
          </div>
        </div>

        <FontAwesomeIcon
          className="icon-close"
          icon={['fas', 'times']}
          onClick={() => {
            setDisplayModalConnect(false);
          }}
        />
      </div>
    </>
  );
};

export default ModalConnect;
