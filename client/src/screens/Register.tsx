import React from 'react';
import Layout from '../components/Layout/Layout';
import { useInput } from '../lib/hooks';
import styled from 'styled-components';

const Register = () => {
  const [email, emailInput, resetEmail] = useInput({
    type: 'email',
    label: 'Email',
    name: 'email'
  });
  const [password, passwordInput, resetPassword] = useInput({
    type: 'password',
    label: 'Password',
    name: 'password'
  });

  const resetForm = () => {
    resetEmail('');
    resetPassword('');
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(email, password);
    resetForm();
  };

  return (
    <Layout>
      <StyledFormWrapper>
        <Text>Register</Text>
        <StyledForm onSubmit={handleSubmit}>
          {emailInput} <br />
          {passwordInput}
          <ButtonWraper>
            <RegisterButton type="submit">Register</RegisterButton>
          </ButtonWraper>
        </StyledForm>
      </StyledFormWrapper>
    </Layout>
  );
};

export default Register;

const StyledForm = styled.form`
  width: 100%;
  max-width: 700px;
  padding: 20px;
  box-sizing: border-box;
`;

const StyledFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Text = styled.div`
  font-family: Montserrat, sans-serif;
  font-style: normal;
  font-weight: 300;
  font-size: 40px;
  line-height: 100%;
  display: flex;
  align-items: flex-end;
  color: #5e27d1;
  margin: 100px 0;
`;

const ButtonWraper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const RegisterButton = styled.button`
  width: 140px;
  height: 50px;
  background: linear-gradient(83.55deg, #808cff 3.55%, #b276ff 97.88%);
  box-shadow: 0 3px 6px -2px #beb4ff;
  border-radius: 8px;
  border: 0;
  font-weight: 700;
  color: #fff;

  &:hover {
    cursor: pointer;
    border: solid #808cff;
    color: #808cff;
    background: transparent;
    transition: all 0.2s ease-in-out;
  }
`;
