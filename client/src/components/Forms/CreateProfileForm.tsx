import Axios from 'axios';
import { useSnackbar } from 'notistack';
import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { AUTH_TOKEN, SERVER_URL } from '../../constants/server';
import UserContext from '../../lib/UserContext';
import { useInput, useTextArea } from '../../lib/hooks';
import {
  ButtonWraper,
  RegisterButton,
  StyledForm,
  StyledFormWrapper,
  Text,
} from './RegisterLogin';

const CreateProfileForm = () => {
  const user = useContext(UserContext);
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  const [name, nameInput] = useInput({
    type: 'text',
    label: 'Name',
    name: 'name',
  });
  const [birthday, birthdayInput] = useInput({
    type: 'date',
    label: 'MM/DD/YYYY',
    name: 'birthday',
  });
  const [about, aboutInput] = useTextArea({
    label: 'About',
    name: 'about',
  });
  const [gender, setGender] = useState<string>('');
  const handleChange = (e: any) => {
    setGender(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem(AUTH_TOKEN);
      const updateProfile = { name, birthday, gender, about };
      const updatedUser = await Axios.post(
        `${SERVER_URL}users/createProfile`,
        updateProfile,
        {
          headers: {
            'x-auth-token': token,
            'Content-Type': 'application/json',
          },
        },
      );
      user?.setUser((prevState: any) => ({
        ...prevState,
        userData: { ...prevState.userData, ...updatedUser.data },
      }));
      enqueueSnackbar('Profile created.', { variant: 'success' });
      history.push('/home');
    } catch (error) {
      const msg = error.response.data.msg;
      msg && enqueueSnackbar(msg, { variant: 'error' });
    }
  };

  return (
    <StyledFormWrapper>
      <Text>Create profile</Text>
      <StyledForm onSubmit={handleSubmit}>
        {nameInput}

        <Select onChange={handleChange} value={gender} required>
          <option value="" selected disabled hidden>
            Gender
          </option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </Select>
        {birthdayInput}
        {aboutInput}
        <ButtonWraper>
          <RegisterButton type="submit">Create</RegisterButton>
        </ButtonWraper>
      </StyledForm>
    </StyledFormWrapper>
  );
};

export default CreateProfileForm;

const Select = styled.select`
  background: #ffffff;
  box-shadow: 0 2px 5px rgba(222, 215, 244, 0.8);
  border-radius: 8px;
  border: 0;
  display: block;
  width: 100%;
  height: 40px;
  margin: 10px 0 20px 0;
  padding: 0 20px;
  box-sizing: border-box;
  transform: matrix(1, 0, 0, 1, 0, 0);

  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  &:hover {
    box-shadow: 0 3px 10px rgba(222, 215, 244, 0.8);
    transition: all 0.4s ease-in-out;
  }

  & > option {
    color: #5e27d1;
    font-family: Montserrat, sans-serif;
    font-style: normal;
    font-weight: 300;
    line-height: 100%;
  }
`;
