import React from 'react';

import CreateProfileForm from '../components/Forms/CreateProfileForm';
import Layout from '../components/Layout/Layout';

const CreateProfile = () => {
  return (
    <Layout authForm>
      <CreateProfileForm />
    </Layout>
  );
};

export default CreateProfile;
