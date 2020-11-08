import styled from 'styled-components';

interface NavbarProps {
  welcomeScreen?: boolean;
}

export const Nav = styled.div<NavbarProps>`
  padding: 0.5rem 2rem;
  display: flex;
  flex: 0;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ welcomeScreen }) => (welcomeScreen ? 'transparent' : 'white')};
  box-shadow: ${({ welcomeScreen }) =>
    welcomeScreen ? 'none' : '0 4px 24px rgba(134, 98, 250, 0.25)'}; ;
`;

export const AuthButton = styled.div<NavbarProps>`
  width: 120px;
  height: 40px;
  background: ${({ welcomeScreen }) =>
    welcomeScreen
      ? '#ffffff'
      : 'linear-gradient(83.55deg, rgba(134, 98, 250, 0.55) 12.89%, #8662FA 97.88%);'};
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Montserrat SemiBold', sans-serif;
  color: ${({ welcomeScreen }) => (welcomeScreen ? '#5e27d1' : '#ffffff')};

  &:hover {
    cursor: pointer;
    border: solid white;
    color: white;
    background: transparent;
    transition: all 0.2s ease-in-out;
  }
`;
