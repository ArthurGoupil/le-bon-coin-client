import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import DragNDrop from './DragNDrop';

const PublishForm = ({ user, setDisplayModalConnect }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [photos, setPhotos] = useState([]);

  const handleTitleChange = event => {
    const value = event.target.value;
    setTitle(value);
  };
  const handleDescriptionChange = event => {
    const value = event.target.value;
    setDescription(value);
  };
  const handlePriceChange = event => {
    const value = event.target.value;
    setPrice(value);
  };

  const handleSubmit = async event => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('price', price);
    for (let i = 0; i < photos.length; i++) {
      formData.append('files'[i], photos[i]);
    }

    try {
      const response = await axios.post(
        'https://leboncoin-api.herokuapp.com/api/offer/publish',
        formData,
        {
          headers: {
            Authorization: 'Bearer ' + user.token,
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      console.log(JSON.stringify(response.data));
    } catch (e) {
      console.error(e.message);
    }
  };

  return (
    <section className="publish-form-container d-flex justify-center">
      <div className="publish-form-bloc d-flex flex-column align-center">
        {user ? (
          <>
            <h2 className="publish-form-section-title">Déposer une annonce</h2>
            <form
              className="publish-form d-flex flex-column"
              onSubmit={handleSubmit}
            >
              <label htmlFor="title">Titre de l'annonce *</label>
              <input
                className="publish-form-title"
                name="title"
                type="text"
                value={title}
                onChange={handleTitleChange}
              ></input>
              <label htmlFor="description">Texte de l'annonce *</label>
              <textarea
                className="publish-form-description"
                name="description"
                type="text-area"
                value={description}
                onChange={handleDescriptionChange}
              ></textarea>
              <label htmlFor="price">Prix *</label>
              <div>
                <input
                  className="publish-form-price"
                  name="price"
                  type="number"
                  value={price}
                  onChange={handlePriceChange}
                ></input>
                <span>&nbsp;€</span>
              </div>
              <label htmlFor="photo">Photo *</label>
              <DragNDrop photos={photos} setPhotos={setPhotos} />
              <input
                className="publish-form-button is-16 is-bld"
                name="submit"
                type="submit"
              ></input>
            </form>
          </>
        ) : (
          <div>
            Veuillez vous&nbsp;
            <button
              onClick={() => {
                setDisplayModalConnect(true);
              }}
            >
              connecter
            </button>
            &nbsp;ou vous <Link to="/sign-up">inscrire</Link> avant de déposer
            une annonce.
          </div>
        )}
      </div>
    </section>
  );
};

export default PublishForm;
