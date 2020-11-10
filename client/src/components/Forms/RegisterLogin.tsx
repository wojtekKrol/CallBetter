import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useInput } from '../../lib/hooks';
import RouteTypes from '../../constants/routes';

interface RegisterLoginFormProps {
  onSubmit?: () => void;
  title: string;
  changeAuthAction: { question: string; action: string };
  route: RouteTypes.LOG_IN | RouteTypes.SIGN_UP;
}

const RegisterLoginForm = ({
  onSubmit,
  title,
  changeAuthAction,
  route
}: RegisterLoginFormProps) => {
  const { question, action } = changeAuthAction;

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
    resetForm();
  };

  return (
    <>
      <StyledFormWrapper>
        <Text>{title}</Text>
        <StyledForm onSubmit={handleSubmit}>
          {emailInput}
          {passwordInput}
          <ButtonWraper>
            <RegisterButton type="submit">{title}</RegisterButton>
            <ChangeAuthAction>
              {question}
              <Link style={{ textDecoration: 'none', marginLeft: 5 }} to={route}>
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
