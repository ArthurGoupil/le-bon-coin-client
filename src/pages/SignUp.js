import React from 'react';
import SignUpForm from '../components/SignUpForm';

const SignUp = ({ setUser }) => {
  return (
    <>
      <SignUpForm setUser={setUser}></SignUpForm>
    </>
  );
};

export default SignUp;
