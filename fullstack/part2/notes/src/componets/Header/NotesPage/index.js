import React from 'react';
import Nav from './Nav';
import { IconButton } from '../../utilities/FormComponents';
import styled from 'styled-components';

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: var(--space-48);
  padding-left: var(--space-16);
  padding-right: var(--space-16);
  border-bottom: 1px solid var(--main-color);
  border-top: 1px solid transparent;
`;

const NotesPageHeader = ({ handleLogout }) => {

  return (
    <>
      <Header>
        <IconButton>
          <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 9H20" stroke="#333333"/>
            <path d="M0 1H20" stroke="#333333"/>
            <path d="M20 17L-2.98023e-07 17" stroke="#333333"/>
          </svg>
        </IconButton>
        <Nav handleLogout={handleLogout} />
      </Header>
    </>
  );
};

export default NotesPageHeader;