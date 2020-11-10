import React from 'react';
import Layout from '../components/Layout/Layout';
import CreateProfileForm from '../components/Forms/CreateProfileForm';

const CreateProfile = () => {
  return (
    <Layout authForm>
      <CreateProfileForm />
    </Layout>
  );
};

export default CreateProfile;
