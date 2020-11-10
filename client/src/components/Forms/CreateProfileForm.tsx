import React, { useState } from 'react';

import { ButtonWraper, RegisterButton, StyledForm, StyledFormWrapper, Text } from './RegisterLogin';
import { useInput, useTextArea } from '../../lib/hooks';
import styled from 'styled-components';

const CreateProfileForm = () => {
  const [name, nameInput, resetName] = useInput({
    type: 'text',
    label: 'Name',
    name: 'name'
  });
  const [birthday, birthdayInput, resetBirthday] = useInput({
    type: 'date',
    label: 'MM/DD/YYYY',
    name: 'birthday'
  });
  const [about, aboutInput, resetAbout] = useTextArea({
    label: 'About',
    name: 'about'
  });

  const [gender, setGender] = useState<string>('');

  const handleChange = (e: any) => {
    setGender(e.target.value);
  };

  const resetForm = () => {
    resetName('');
    setGender('');
    resetBirthday('');
    resetAbout('');
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    resetForm();
  };

  return (
    <>
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
    </>
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
