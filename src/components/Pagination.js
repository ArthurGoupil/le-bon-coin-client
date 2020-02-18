import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Pagination = ({ offersCount, pageParams }) => {
  const pagesArray = [];
  for (let i = 0; i < Math.ceil(offersCount / 10); i++) {
    pagesArray.push(i);
  }
  let pageParamsNum = Number(pageParams);
  if (!pageParamsNum) {
    pageParamsNum = 1;
  }

  return (
    <div className="pages d-flex align-center justify-center flex-wrap">
      <Link
        to={`/offers/page=${pageParamsNum - 1}`}
        className={pageParamsNum > 1 ? 'visible' : 'invisible'}
      >
        <FontAwesomeIcon
          className="icon-chevron"
          icon={['fas', 'chevron-left']}
        />
      </Link>

      {pagesArray.map((item, index) => {
        return (
          <Link
            to={`/offers/page=${item + 1}`}
            className={
              item === pageParamsNum - 1
                ? 'd-flex justify-center align-center page-number is-19 page-selected'
                : 'd-flex justify-center align-center page-number is-19'
            }
            key={index}
          >
            {item + 1}
          </Link>
        );
      })}

      <Link
        to={`/offers/page=${pageParamsNum + 1}`}
        className={pageParamsNum < pagesArray.length ? 'visible' : 'invisible'}
      >
        <FontAwesomeIcon
          className="icon-chevron"
          icon={['fas', 'chevron-right']}
        />{' '}
      </Link>
    </div>
  );
};

export default Pagination;
