import React from 'react';
import PublishForm from '../components/PublishForm';

const Publish = ({ user, setDisplayModalConnect }) => {
  return (
    <PublishForm
      user={user}
      setDisplayModalConnect={setDisplayModalConnect}
    ></PublishForm>
  );
};

export default Publish;
