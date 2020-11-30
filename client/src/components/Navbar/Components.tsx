import styled from 'styled-components';

interface NavbarProps {
  welcomeScreen?: boolean;
  logOut?: boolean;
  primary?: boolean;
  primaryFont?: boolean;
}

export const Nav = styled.div<NavbarProps>`
  padding: 0.5rem 2rem;
  display: flex;
  flex: 0;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ welcomeScreen }) =>
    welcomeScreen ? 'transparent' : 'white'};
  box-shadow: ${({ welcomeScreen }) =>
    welcomeScreen ? 'none' : '0 4px 24px rgba(134, 98, 250, 0.25)'}; ;
`;

export const AuthButton = styled.div<NavbarProps>`
  width: ${({ primary }) => (primary ? '80px' : '140px')};
  height: ${({ primary }) => (primary ? '30px' : '50px')};
  box-shadow: 0 3px 6px -2px #beb4ff;
  border-radius: 8px;
  border: 0;
  font-weight: 700;
  background: ${({ welcomeScreen }) =>
    welcomeScreen
      ? '#ffffff'
      : 'linear-gradient(83.55deg, #808cff 3.55%, #b276ff 97.88%)'};

  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Montserrat SemiBold', sans-serif;
  color: ${({ welcomeScreen }) => (welcomeScreen ? '#5e27d1' : '#ffffff')};

  &:hover {
    cursor: pointer;
    border: ${({ logOut }) => (logOut ? 'solid #8662FA' : 'solid #ffffff')};
    color: ${({ logOut }) => (logOut ? '#5e27d1' : '#ffffff')};
    background: transparent;
    transition: all 0.2s ease-in-out;
  }
  @media (max-width: 768px) {
    width: 100px;
    height: 40px;
  }
`;
