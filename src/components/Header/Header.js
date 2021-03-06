import React from 'react';
import tw from 'tailwind.macro';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import Container from '../Container';
import Heading from '../Heading';

// ============================================================================

const Header = () => {
  return (
    <StyledHeader>
      <Container>
        <div
          css={css`
            grid-column: span 9;
          `}
        >
          <Heading primary="Chrish Dunne">
            <h2>Chrish Dunne</h2>
            <p>Designer/Developer</p>
          </Heading>
        </div>

        <div
          css={css`
            grid-column: span 3;
            @media (max-width: 640px) {
              display: none;
            }
          `}
        >
          <Heading>
            <h2>Contact</h2>
            <p>
              <a href="mailto:hey@chrish.design">hey@chrish.design</a>
            </p>
          </Heading>
        </div>
      </Container>
    </StyledHeader>
  );
};

// ============================================================================

const StyledHeader = styled.header`
  ${tw`mb-16`}
`;

export default Header;
