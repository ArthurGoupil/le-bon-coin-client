import React from 'react';
import { useHistory } from 'react-router-dom';

const Home = props => {
  const history = useHistory();
  return <>{history.push('/offers/page=1')}</>;
};

export default Home;
