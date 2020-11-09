import React from 'react';
import Layout from '../components/Layout/Layout';
import RegisterLoginForm from '../components/Forms/RegisterLogin';
import RouteTypes from '../constants/routes';

const Register = () => {
  const changeAuthAction = { question: 'Already have account?', action: 'Log in!' };
  return (
    <Layout authForm>
      <RegisterLoginForm
        title="Register"
        changeAuthAction={changeAuthAction}
        route={RouteTypes.LOG_IN}
      />
    </Layout>
  );
};

export default Register;
