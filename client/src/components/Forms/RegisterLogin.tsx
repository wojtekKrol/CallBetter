import Axios from 'axios';
import { useSnackbar } from 'notistack';
import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';

import RouteTypes from '../../constants/routes';
import { AUTH_TOKEN, SERVER_URL } from '../../constants/server';
import UserContext from '../../lib/UserContext';
import { useInput } from '../../lib/hooks';

interface RegisterLoginFormProps {
  title: string;
  changeAuthAction: { question: string; action: string };
  route: RouteTypes.LOG_IN | RouteTypes.SIGN_UP;
  register?: boolean;
}

const RegisterLoginForm = ({
  title,
  changeAuthAction,
  route,
  register,
}: RegisterLoginFormProps) => {
  const { question, action } = changeAuthAction;
  const user = useContext(UserContext);
  const history = useHistory();

  const [email, emailInput] = useInput({
    type: 'email',
    label: 'Email',
    name: 'email',
  });
  const [password, passwordInput] = useInput({
    type: 'password',
    label: 'Password',
    name: 'password',
  });
  const [passwordCheck, passwordCheckInput] = useInput({
    type: 'password',
    label: 'Verify password',
    name: 'passwordCheck',
  });
  const { enqueueSnackbar } = useSnackbar();

  const handleRegister = async (e: any) => {
    e.preventDefault();
    try {
      const newUser = { email, password, passwordCheck };
      await Axios.post(`${SERVER_URL}users/sign-up`, newUser);

      const loginRes = await Axios.post(`${SERVER_URL}users/login`, {
        email,
        password,
      });

      user?.setUser({
        token: loginRes.data.token,
        userData: loginRes.data.userData,
        logged: loginRes.data.logged,
      });

      localStorage.setItem(AUTH_TOKEN, loginRes.data.token);
      enqueueSnackbar('Account created.', { variant: 'success' });
      history.push('/create-profile');
    } catch (error) {
      const msg = error.response.data.msg;
      msg && enqueueSnackbar(msg, { variant: 'error' });
    }
  };
  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      const userToLogin = { email, password };
      await Axios.post(`${SERVER_URL}users/login`, userToLogin);

      const loginRes = await Axios.post(
        `${SERVER_URL}users/login`,
        {
          email,
          password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const getUserData = await Axios.get(`${SERVER_URL}users/`, {
        headers: {
          'x-auth-token': loginRes.data.token,
        },
      });

      user?.setUser({
        token: loginRes.data.token,
        userData: getUserData.data,
        logged: loginRes.data.logged,
      });

      enqueueSnackbar('Logged in.', { variant: 'success' });

      localStorage.setItem(AUTH_TOKEN, loginRes.data.token);
      history.push('/home');
    } catch (error) {
      const msg = error.response.data.msg;
      msg && enqueueSnackbar(msg, { variant: 'error' });
    }
  };
  return (
    <>
      <StyledFormWrapper>
        <Text>{title}</Text>
        <StyledForm onSubmit={register ? handleRegister : handleLogin}>
          {emailInput}
          {passwordInput}
          {register && passwordCheckInput}
          <ButtonWraper>
            <RegisterButton type="submit">{title}</RegisterButton>
            <ChangeAuthAction>
              {question}
              <Link
                style={{ textDecoration: 'none', marginLeft: 5 }}
                to={route}>
                {action}
              </Link>
            </ChangeAuthAction>
          </ButtonWraper>
        </StyledForm>
      </StyledFormWrapper>
    </>
  );
};

export default RegisterLoginForm;

export const StyledForm = styled.form`
  width: 100%;
  max-width: 500px;
  padding: 20px;
  box-sizing: border-box;
`;

export const StyledFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Text = styled.div`
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

export const ChangeAuthAction = styled.div`
  font-family: Montserrat, sans-serif;
  font-style: normal;
  font-weight: 300;
  font-size: 15px;
  line-height: 100%;
  display: flex;
  align-items: flex-end;
  color: #9983e0;
  margin: 20px 0;

  & > Link {
    color: #8059fb;
  }
`;

export const ButtonWraper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const RegisterButton = styled.button`
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
