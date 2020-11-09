import React from 'react';
import Layout from '../components/Layout/Layout';
import RegisterLoginForm from '../components/Forms/RegisterLogin';
import RouteTypes from '../constants/routes';

const Register = () => {
  const changeAuthAction = { question: 'Don’t have account?', action: 'Create it!' };
  return (
    <Layout authForm>
      <RegisterLoginForm
        title="Login"
        changeAuthAction={changeAuthAction}
        route={RouteTypes.SIGN_UP}
      />
    </Layout>
  );
};

export default Register;
