import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Search = () => {
  return (
    <div className="search-box d-flex justify-center align-center">
      <div className="search-box-input-icon">
        <input
          className="search-box-input is-16"
          type="text"
          name="search"
          placeholder="Que recherchez-vous ?"
        ></input>
        <FontAwesomeIcon className="icon-search-box" icon={['fas', 'search']} />
        <button className="search-box-button is-16">Rechercher</button>
      </div>
    </div>
  );
};

export default Search;
