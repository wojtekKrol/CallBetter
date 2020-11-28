import React, { useState } from 'react';
import styled, { css } from 'styled-components';

interface HookProps {
  type?: string;
  name: string;
  label: string;
}

export const useInput = ({ type, name, label }: HookProps) => {
  const [value, setValue] = useState<string>('');

  const input = (
    <>
      <StyledInput
        type={type}
        name={name}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={label}
      />
    </>
  );
  return [value, input, setValue] as const;
};

export const useTextArea = ({ name, label }: HookProps) => {
  const [value, setValue] = useState<string>('');

  const input = (
    <>
      <StyledTextArea
        name={name}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={label}
      />
    </>
  );
  return [value, input, setValue] as const;
};

const sharedStyles = css`
  background-color: #fff;
  border-radius: 8px;
  height: 40px;
  margin: 10px 0 20px 0;
  padding: 20px;
  box-sizing: border-box;
  transform: matrix(1, 0, 0, 1, 0, 0);
  box-shadow: 0px 2px 5px rgba(222, 215, 244, 0.8);
  border: 0;
  display: block;
  width: 100%;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  &::-webkit-input-placeholder {
    color: #c2badb;
  }
  &:hover {
    box-shadow: 0px 3px 10px rgba(222, 215, 244, 0.8);
    transition: all 0.4s ease-in-out;
  }
`;

export const StyledInput = styled.input`
  ${sharedStyles}
`;

export const StyledTextArea = styled.textarea`
  max-width: 100%;
  min-width: 100%;
  min-height: 130px;
  max-height: 130px;
  ${sharedStyles}
`;
