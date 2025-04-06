import React from "react";
import styled from "styled-components";

const FooterContainer = styled.footer`
  background-color: ${(props) => props.theme.header}; /* Matches header theme */
  color: ${(props) => props.theme.text};
  text-align: center;
  padding: 15px 10px;
  position: relative;
  width: 100%;
  bottom: 0;
  font-size: 0.9rem;
`;

function Footer() {
  return (
    <FooterContainer>
      © {new Date().getFullYear()} Your Website Name. All Rights Reserved.
    </FooterContainer>
  );
}

export default Footer;
