import React, { useState } from 'react';
import styled from 'styled-components';
import { MenuButton, MenuText } from '../../MenuButton';
import Author from '../../../assets/author.png';

const Img = styled.img`
  display: block;
  width: 2.4rem;
  border-radius: 50%;
`;

const ImgButton = styled.button`
  padding: var(--space-2);
  border: 1px solid transparent;
  border-radius: 50%;

  &:focus {
    border-color: var(--main-color);
  }
`;

const Nav = styled.nav`
  position: relative;
`;

const Theme = styled.div`
  display: flex;
  padding: var(--space-4) var(--space-8);
`;

const ThemeButton = styled.button`
  width: 24px;
  height: 24px;
  border: 1px solid var(--main-color);
  border-radius: 50%;
  background-color: ${props => props.theme.color === 'dark' ? '#333' : '#fff'}; 
  margin-left: ${props => props.space ? 'var(--space-8)': '0'};
`;

ThemeButton.defaultProps = {
  theme: {
    color: 'white'
  }
};

const Hr = styled.hr`
  border: none;
  height: 1px;
  background-color: var(--color-grey-06);
  margin-top: var(--space-4);
  margin-bottom: var(--space-4);
`;

const UserMenu = ({ handleLogout }) => {
  return (
    <div className="user-menu">
      <MenuButton onClick={handleLogout}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="24 / basic / share-arrow">
            <path id="icon" fillRule="evenodd" clipRule="evenodd" d="M4.6669 7.5833L10.8419 7.5833L8.92109 9.50416L9.74605 10.3291L13.0752 6.99997L9.74605 3.67082L8.92109 4.49578L10.8419 6.41663L4.6669 6.41663L4.6669 7.5833ZM2.33351 12.25L7.58351 12.25L7.58351 11.0833L2.33351 11.0833L2.33351 2.91667L7.58351 2.91667L7.58351 1.75L2.33351 1.75C1.68918 1.75 1.16684 2.27233 1.16684 2.91667L1.16684 11.0833C1.16684 11.7277 1.68918 12.25 2.33351 12.25Z" fill="#333333"/>
          </g>
        </svg>
        <MenuText>退出</MenuText>
      </MenuButton>
      <Hr/>
      <Theme>
        <ThemeButton></ThemeButton>
        <ThemeButton theme={{ color: 'dark' }} space></ThemeButton>
      </Theme>
    </div>
  );
};

const NotesNav = ({ handleLogout }) => {
  const [show, setShow] = useState(false);
  return (
    <Nav>
      <ImgButton onClick={() => setShow(!show)}>
        <Img src={Author} alt="用户头像"/>
      </ImgButton>
      {show
        ? <UserMenu handleLogout={handleLogout} />
        : null
      }
    </Nav>
  );
};

export default NotesNav;