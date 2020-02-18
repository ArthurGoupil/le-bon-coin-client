import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import SearchBloc from '../components/SearchBloc';
import LineOffer from '../components/LineOffer';
import Pagination from '../components/Pagination';

const Search = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [offersCount, setOffersCount] = useState();
  const { search } = useParams();
  const lostIconSrc =
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDMwMC40NiAzMDAuNDYiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDMwMC40NiAzMDAuNDY7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiI+PGc+PGcgaWQ9IlhNTElEXzEzMjZfIj4KCTxnPgoJCTxnPgoJCQk8cGF0aCBkPSJNMTMwLjYzMSwxMTYuNTAzYy0wLjk3My0xLjQ5Ni0yLjYzNi0yLjM5OC00LjQyLTIuMzk4SDc5LjI2di0xMS4wOTRjMC00LjM0NS0zLjUyMi03Ljg2Ny03Ljg2Ny03Ljg2NyAgICAgYy00LjM0NSwwLTcuODY3LDMuNTIyLTcuODY3LDcuODY3djQ3Ljg4NkgxNi41NzNjLTEuNzg0LDAtMy40NDcsMC45MDItNC40MiwyLjM5OGwtOC40NTcsMTMuMDAzICAgICBjLTAuMzM0LDAuNTEzLTAuMzM0LDEuMTc1LDAsMS42ODlsOC40NTcsMTMuMDAzYzAuOTczLDEuNDk2LDIuNjM2LDIuMzk4LDQuNDIsMi4zOThoNDYuOTUydjEwMS4zMzhINDguODkgICAgIGMtNC4zNDUsMC03Ljg2NywzLjUyMi03Ljg2Nyw3Ljg2N3MzLjUyMiw3Ljg2Nyw3Ljg2Nyw3Ljg2N2g0NS4wMDVjNC4zNDUsMCw3Ljg2Ny0zLjUyMiw3Ljg2Ny03Ljg2N3MtMy41MjItNy44NjctNy44NjctNy44NjcgICAgIEg3OS4yNlYxNDYuNTk0aDQ2Ljk1MWMxLjc4NCwwLDMuNDQ3LTAuOTAyLDQuNDItMi4zOThsOC40NTctMTMuMDAzYzAuMzM0LTAuNTEzLDAuMzM0LTEuMTc1LDAtMS42ODlMMTMwLjYzMSwxMTYuNTAzeiIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCIgY2xhc3M9ImFjdGl2ZS1wYXRoIiBkYXRhLW9sZF9jb2xvcj0iIzAwMDAwMCIgc3R5bGU9ImZpbGw6I0YzNjAyNSI+PC9wYXRoPgoJCQk8Y2lyY2xlIGN4PSIyMjYuMjUyIiBjeT0iNDAuNDIiIHI9IjIzLjA4IiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBjbGFzcz0iYWN0aXZlLXBhdGgiIGRhdGEtb2xkX2NvbG9yPSIjMDAwMDAwIiBzdHlsZT0iZmlsbDojRjM2MDI1Ij48L2NpcmNsZT4KCQkJPHBhdGggZD0iTTI1Ni4wNSw3My41NjVjLTkuNjQ3LDAtNDEuOTc1LDAtNTEuNDY5LDBsLTI0LjM4Ni0yLjg1MWwxMy4xMjctMTUuNzcxYzMuOTM0LTQuNzI3LDMuMjkyLTExLjc0OS0xLjQzNS0xNS42ODQgICAgIGMtNC43MjgtMy45MzQtMTEuNzQ5LTMuMjkxLTE1LjY4MywxLjQzNUwxNDkuOTMsNzIuMjY0Yy0yLjYxNCwzLjE0MS0zLjI5OCw3LjQ2MS0xLjc4MiwxMS4yNTYgICAgIGMxLjUxNiwzLjc5NCw0Ljk4OSw2LjQ1Myw5LjA0Nyw2LjkyOWwzOS4yOTEsNC41OTRsMC4wMDUsMTkyLjA1NGMwLDcuMzgxLDUuOTgzLDEzLjM2MywxMy4zNjMsMTMuMzYzICAgICBzMTMuMzYzLTUuOTgyLDEzLjM2My0xMy4zNjNWMTgwLjI4NGg1Ljc3djEwNi44MTNjMCw3LjM4MSw1Ljk4MywxMy4zNjMsMTMuMzYzLDEzLjM2M3MxMy4zNjMtNS45ODIsMTMuMzYzLTEzLjM2MyAgICAgbC0wLjIzNy0xODcuMTE0Yy0wLjAwMS0xLjI3MSwxLjAxNi0yLjMwOCwyLjI4Ni0yLjMzMWMxLjI3MS0wLjAyMywyLjMyNiwwLjk3NSwyLjM3LDIuMjQ1djAuMDAxbDAuNDExLDgxLjgxMiAgICAgYzAuMDMxLDYuMTMxLDUuMDEsMTEuMDgsMTEuMTM1LDExLjA4YzAuMDE4LDAsMC4wMzgtMC4wMDEsMC4wNTctMC4wMDFjNi4xNS0wLjAzMSwxMS4xMS01LjA0MiwxMS4wOC0xMS4xOTJsLTAuNDExLTgxLjgxMiAgICAgQzI4Mi4zMyw4NS4zMjcsMjcwLjUwOCw3My41NjUsMjU2LjA1LDczLjU2NXoiIGRhdGEtb3JpZ2luYWw9IiMwMDAwMDAiIGNsYXNzPSJhY3RpdmUtcGF0aCIgZGF0YS1vbGRfY29sb3I9IiMwMDAwMDAiIHN0eWxlPSJmaWxsOiNGMzYwMjUiPjwvcGF0aD4KCQkJPHJlY3QgeD0iMjc0LjQ1MyIgeT0iMzQuNDAxIiB3aWR0aD0iOS42MDgiIGhlaWdodD0iMTAuMTY1IiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBjbGFzcz0iYWN0aXZlLXBhdGgiIGRhdGEtb2xkX2NvbG9yPSIjMDAwMDAwIiBzdHlsZT0iZmlsbDojRjM2MDI1Ij48L3JlY3Q+CgkJCTxwYXRoIGQ9Ik0yODMuNTAyLDBjLTUuNjg3LDAtMTAuNzY3LDIuNzE3LTEzLjAxNiw3Ljk5NWw3LjUsNS4zMzFjMC44NTUtMC45OTUsMi4wMTgtMy44NDMsNS4wODMtMy44NDMgICAgIGMxLjg2OCwwLDMuNzE5LDEuMDkxLDMuNzE5LDMuMDk5YzAsMy40OTYtNS44NTIsNS44NS03LjYyNCw2LjgxOGMtNC40NTksMi4zMTYtNC44OTcsNS40NTgtNC44OTcsOS4xMTJoOS42MDggICAgIGMwLTEuNDA4LDEuMjgtMi4zMjcsMi43NTgtMy4xNjFjNC4yMzEtMi4zODcsMTAuMzgyLTQuMDIxLDEwLjM4Mi0xMi43MDZDMjk3LjAxNCw0LjMxNCwyOTAuOTE5LDAsMjgzLjUwMiwweiIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCIgY2xhc3M9ImFjdGl2ZS1wYXRoIiBkYXRhLW9sZF9jb2xvcj0iIzAwMDAwMCIgc3R5bGU9ImZpbGw6I0YzNjAyNSI+PC9wYXRoPgoJCTwvZz4KCTwvZz4KPC9nPjwvZz4gPC9zdmc+';
  useEffect(() => {
    console.log(document.body.offsetHeight);

    const fetchData = async () => {
      let pageLink = `https://leboncoin-api.herokuapp.com/api/offer/with-count?title=${search}`;
      try {
        const response = await axios.get(pageLink);
        setData(response.data);
        setOffersCount(response.data.count);
        setIsLoading(false);
      } catch (e) {
        console.error(e.message);
      }
    };
    fetchData();
  }, [search]);

  return (
    <div className="offers d-flex flex-column align-center">
      <div className="offers-top d-flex flex-column align-center">
        <div className="orange-ellipse-container">
          <div className="orange-ellipse"></div>
        </div>
        <SearchBloc />
      </div>
      {!isLoading ? (
        data.offers.length !== 0 ? (
          <>
            {data.offers.map((offer, index) => {
              const offerLink = '/offer/' + offer._id;
              return (
                <Link key={index} to={offerLink}>
                  <LineOffer {...offer}></LineOffer>
                </Link>
              );
            })}
            {/* <Pagination offersCount={offersCount} pageParams={pageParams} /> */}
          </>
        ) : (
          <>
            <img className="icon-lost" alt="Lost-icon" src={lostIconSrc} />
            <p>Aucune annonce ne correspond à votre recherche.</p>
            <span className="back-to-offers is-15 is-orange">
              <FontAwesomeIcon
                className="is-13"
                icon={['fas', 'chevron-right']}
              />
              &nbsp;
              <Link
                to="/offers/page=1"
                className="back-to-offers-link is-orange"
              >
                Revenir à la liste des annonces
              </Link>
            </span>
          </>
        )
      ) : (
        <span>En cours de chargement</span>
      )}
    </div>
  );
};

export default Search;
