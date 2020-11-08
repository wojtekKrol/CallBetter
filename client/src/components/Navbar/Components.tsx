import styled from 'styled-components';

export const Nav = styled.div<{ welcomeScreen?: boolean }>`
  padding: 0.5rem 2rem;
  display: flex;
  flex: 0;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ welcomeScreen }) => (welcomeScreen ? 'transparent' : 'white')};
  box-shadow: 0 4px 24px rgba(134, 98, 250, 0.25);
`;

export const AuthButton = styled.div`
  width: 120px;
  height: 40px;
  background: white;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Montserrat SemiBold', sans-serif;
  color: #5e27d1;

  &:hover {
    cursor: pointer;
    border: solid white;
    color: white;
    background: transparent;
    transition: all 0.2s ease-in-out;
  }
`;
