import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: ${(props) => props.theme.footer};
  color: ${(props) => props.theme.text};
  padding: 1rem;
  text-align: center;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  font-size: 0.9rem;
  border-top: 1px solid #eee; /* Light subtle border */
`;

function Footer({ theme }) {
  return (
    <FooterContainer theme={theme}>
      © {new Date().getFullYear()} Recipe App. All rights reserved.
    </FooterContainer>
  );
}

export default Footer;