import React from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';

import RouteTypes from '../../constants/routes';
import SVGIcon from './SVGIcon';

const Logo = () => {
  const params = useParams();

  return (
    <StyledLogo>
      {
        //@ts-ignore
        params.callId ? (
          <SVGIcon />
        ) : (
          <Link to={RouteTypes.HOME}>
            <SVGIcon />
          </Link>
        )
      }
    </StyledLogo>
  );
};

const StyledLogo = styled.div`
  padding: 10px 0;
`;

export default Logo;
