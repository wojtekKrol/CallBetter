import styled from 'styled-components';

import img from '../../assets/img.jpg';

interface ContainerProps {
  welcomeScreen?: boolean;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  background: ${({ welcomeScreen }) =>
    welcomeScreen ? 'url(' + img + ')' : 'white'};
  background-size: cover;
  word-wrap: break-word;
  @media (max-width: 415px) {
    background: ${({ welcomeScreen }) =>
      welcomeScreen ? 'linear-gradient(270deg,#021b79,#0575e6)' : 'white'};
  }
`;

export const Overlay = styled.div<ContainerProps>`
  height: 100vh;
  background: ${({ welcomeScreen }) =>
    welcomeScreen
      ? 'linear-gradient(\n    227.23deg,\n    rgba(158, 0, 255, 0.54) 4.03%,\n    rgba(112, 0, 255, 0.54) 91.25%\n  );'
      : 'white'};
  @media (max-width: 415px) {
    background: transparent;
  }
`;

export const ChildrenContainer = styled.div`
  flex-grow: 1;
  margin: 50px auto;
  width: 90%;
`;
