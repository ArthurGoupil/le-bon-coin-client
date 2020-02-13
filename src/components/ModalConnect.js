import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ModalConnect = ({ setdisplayModalConnect, setUser }) => {
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
          'https://leboncoin-api.herokuapp.com/api/user/log_in',
          {
            email: email,
            password: password
          }
        );
        Cookies.set('userToken', response.data.token, { expires: 30 });
        setUser({ token: response.data.token });
        setdisplayModalConnect(false);
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
      <div className="modal-connect d-flex justify-center align-center">
        <div className="modal-connect-box">
          <form
            className="d-flex flex-column align-center"
            onSubmit={handleSubmit}
          >
            <label>Adresse email</label>
            <input
              name="email"
              type="email"
              value={email}
              onChange={handleEmailChange}
            />
            <label>Password</label>
            <input
              name="password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
            <input name="submit" type="submit" value="Se connecter" />
            <span>{errorMessage}</span>
          </form>

          <div>Vous n'avez pas de compte ?</div>
          <button>Créer un compte</button>
        </div>

        <FontAwesomeIcon
          className="icon-close"
          icon={['fas', 'times']}
          onClick={() => {
            setdisplayModalConnect(false);
          }}
        />
      </div>
    </>
  );
};

export default ModalConnect;
