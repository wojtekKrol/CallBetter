import React, { useState } from 'react';
import styled, { css } from 'styled-components';

interface HookProps {
  type: string;
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
        required
      />
    </>
  );
  return [value, input, setValue] as const;
};

const sharedStyles = css`
  background-color: #fff;
  height: 40px;
  border-radius: 8px;
  margin: 10px 0 20px 0;
  padding: 20px;
  box-sizing: border-box;
  transform: matrix(1, 0, 0, 1, 0, 0);
`;

const StyledInput = styled.input`
  background: #ffffff;
  box-shadow: 0px 2px 5px rgba(222, 215, 244, 0.8);
  border-radius: 8px;
  border: 0;
  transform: matrix(1, 0, 0, -1, 0, 0);
  margin-bottom: 10px;
  display: block;
  width: 100%;
  ${sharedStyles}
  &::-webkit-input-placeholder {
    color: #c2badb;
  }
  &:hover {
    box-shadow: 0px 3px 10px rgba(222, 215, 244, 0.8);
    transition: all 0.4s ease-in-out;
  }
`;
