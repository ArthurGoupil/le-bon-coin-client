import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SignUp = ({ setUser }) => {
  const [pseudo, setPseudo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [acceptConditions, setAcceptConditions] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const history = useHistory();
  const fieldIsEmpty =
    pseudo === '' || email === '' || password === '' || passwordConfirm === '';

  const handlePseudoChange = event => {
    const value = event.target.value;
    setPseudo(value);
  };
  const handleEmailChange = event => {
    const value = event.target.value;
    setEmail(value);
  };
  const handlePasswordChange = event => {
    const value = event.target.value;
    setPassword(value);
  };
  const handlePasswordConfirmChange = event => {
    const value = event.target.value;
    setPasswordConfirm(value);
  };
  const handleAcceptConditionsChange = event => {
    const value = event.target.checked;
    setAcceptConditions(value);
  };
  const handleSubmit = async event => {
    event.preventDefault();
    if (fieldIsEmpty) {
      setErrorMessage('Veuillez renseigner tous les champs.');
    } else if (!acceptConditions) {
      setErrorMessage('Veuillez accepter les CGV et CGU.');
    } else if (password !== passwordConfirm) {
      setErrorMessage('Les deux mots de passe renseignés sont différents.');
    } else {
      try {
        const response = await axios.post(
          'https://leboncoin-api.herokuapp.com/api/user/sign_up',
          {
            username: pseudo,
            email: email,
            password: password
          }
        );
        Cookies.set('userToken', response.data.token, { expires: 30 });

        setUser({ token: response.data.token });
        setErrorMessage(null);
        history.push('/');
      } catch (e) {
        setErrorMessage('Adresse email ou mot de passe incorrect.');
        console.error('test');
      }
    }
  };

  return (
    <div className="sign-up-bloc d-flex">
      <div className="sign-up-bloc-left">
        <h2>Pourquoi créer un compte ?</h2>
        <div className="sign-up-bloc-left-line d-flex align-center space-between">
          <div className="icon-sign-up-container d-flex justify-center">
            <FontAwesomeIcon className="icon-sign-up" icon={['far', 'clock']} />
          </div>
          <div className="sign-up-bloc-left-text">
            <h3>Gagnez du temps</h3>
            <p>
              Publiez vos annonces rapidement, avec vos informations
              pré-remplies chaque fois que vous souhaitez déposer une nouvelle
              annonce.
            </p>
          </div>
        </div>
        <div className="sign-up-bloc-left-line d-flex align-center space-between">
          <div className="icon-sign-up-container d-flex justify-center">
            <FontAwesomeIcon className="icon-sign-up" icon={['far', 'bell']} />
          </div>
          <div className="sign-up-bloc-left-text">
            <h3>Soyez les premiers informés</h3>
            <p>
              Créez des alertes Immo ou Emploi et ne manquez jamais l’annonce
              qui vous intéresse.
            </p>
          </div>
        </div>
        <div className="sign-up-bloc-left-line d-flex align-center space-between">
          <div className="icon-sign-up-container d-flex justify-center">
            <FontAwesomeIcon className="icon-sign-up" icon={['far', 'eye']} />
          </div>
          <div className="sign-up-bloc-left-text">
            <h3>Visibilité</h3>
            <p>
              Suivez les statistiques de vos annonces (nombre de fois où votre
              annonce a été vue, nombre de contacts reçus).{' '}
            </p>
          </div>
        </div>
      </div>
      <div className="sign-up-bloc-right">
        <h2>Créez un compte</h2>
        <form className="d-flex flex-column" onSubmit={handleSubmit}>
          <label>Pseudo *</label>
          <input
            name="pseudo"
            type="text"
            value={pseudo}
            onChange={handlePseudoChange}
          />
          <label>Adresse email *</label>
          <input
            name="email"
            type="email"
            value={email}
            onChange={handleEmailChange}
          />
          <div className="sign-up-bloc-right-passwords d-flex align-center">
            <div>
              <label>Mot de passe *</label>
              <input
                name="password"
                type="password"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <div>
              <label>Confirmez le mot de passe *</label>
              <input
                name="password-confirm"
                type="password"
                value={passwordConfirm}
                onChange={handlePasswordConfirmChange}
              />
            </div>
          </div>
          <div className="d-flex align-center">
            <input
              name="CGV-CGU"
              type="checkbox"
              value={acceptConditions}
              onChange={handleAcceptConditionsChange}
            />
            <label className="cgu-cgv">
              « J’accepte les{' '}
              <Link to="#" className="is-blue">
                <b>Conditions Générales de Vente</b>
              </Link>{' '}
              et les{' '}
              <Link to="#" className="is-blue">
                <b>Conditions Générales d’Utilisation</b>
              </Link>{' '}
              »
            </label>
          </div>
          <span className="error-message is-16">{errorMessage}</span>
          <input
            className="is-16 is-bld"
            name="submit"
            type="submit"
            value="Créer mon Compte Personnel"
          />
        </form>
      </div>
    </div>
  );
};

export default SignUp;
