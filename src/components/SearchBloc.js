import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Search = () => {
  const [search, setSearch] = useState('');
  const history = useHistory();

  const handleSearchChange = event => {
    const value = event.target.value;
    setSearch(value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    history.push(`/offers/search=${search}`);
  };

  return (
    <div className="search-box d-flex justify-center align-center">
      <div className="search-box-input-icon">
        <form onSubmit={handleSubmit}>
          <input
            className="search-box-input is-16"
            type="text"
            name="search"
            placeholder="Que recherchez-vous ?"
            value={search}
            onChange={handleSearchChange}
          />
          <FontAwesomeIcon
            className="icon-search-box"
            icon={['fas', 'search']}
          />
          <input
            type="submit"
            className="search-box-button is-16"
            value="Rechercher"
          />
        </form>
      </div>
    </div>
  );
};

export default Search;
