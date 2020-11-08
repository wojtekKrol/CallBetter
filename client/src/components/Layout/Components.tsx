import styled from 'styled-components';
import img from '../../assets/img.jpg';

export const Container = styled.div<{ welcomeScreen?: boolean }>`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  background: ${({ welcomeScreen }) => (welcomeScreen ? 'url(' + img + ')' : 'white')};
  background-size: cover;
  word-wrap: break-word;
`;

export const Overlay = styled.div`
  height: 100vh;
  background: linear-gradient(
    227.23deg,
    rgba(158, 0, 255, 0.54) 4.03%,
    rgba(112, 0, 255, 0.54) 91.25%
  );
`;

export const ChildrenContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  margin: auto;
  width: 90%;
`;