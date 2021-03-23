import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Note from '../Note';
import Header from '../Header/NotesPage';
import noteService from '../services/note';
import { IconButton } from '../utilities/FormComponents';
import { MenuButton, MenuText } from '../MenuButton';

const ExtendedButton = styled(MenuButton)`
  padding: var(--space-12) var(--space-16);

  &:focus {
    background-color: var(--main-color);
    color: #fff;
  }

  &:focus path {
    fill: #fff;
  }
`;

const Notes = ({ notes, toggleImportanceOf, handleLogout, handleNotes, user, children }) => {
  const [showAll, setShowAll] = useState(true);

  useEffect(async () => {
    try {
      const initialNotes = await noteService.getAll();
      handleNotes(initialNotes.filter(n =>
        n.user.username === user.username
      ));
    } catch(error) {
      console.log(error.message);
    }
  }, []);


  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important === true);

  return (
    <>
      <Header handleLogout={handleLogout} />
      <main>
        <div className="left-menu-overlay">
          <div className="left-menu-container">
            <div className="left-menu-header">
              <IconButton>
                <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 9H20" stroke="#333333"/>
                  <path d="M0 1H20" stroke="#333333"/>
                  <path d="M20 17L-2.98023e-07 17" stroke="#333333"/>
                </svg>
              </IconButton>
            </div>
            <div className="left-menu">
              <ul className="left-menu-items">
                <li className="left-menu-item">
                  <ExtendedButton as="a" href="#">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M4.90739 8.33334L9.9085 3.33223L14.9096 8.33334H14.9085V16.6667H4.90849V8.33334H4.90739ZM3.24182 9.99891L2.01116 11.2296L0.833496 10.0519L8.73098 2.15441C9.38131 1.50409 10.4357 1.50409 11.086 2.15441L18.9835 10.0519L17.8058 11.2296L16.5752 9.99889V16.6667C16.5752 17.5871 15.829 18.3333 14.9085 18.3333H4.90849C3.98801 18.3333 3.24182 17.5871 3.24182 16.6667V9.99891Z" fill="#333333"/>
                    </svg>
                    <MenuText>全部</MenuText>
                  </ExtendedButton>
                  <ExtendedButton as="a" href="#">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M13.7945 1.66668C12.5881 1.66666 11.8105 1.81038 10.919 2.24672C10.589 2.40827 10.2794 2.60282 9.9918 2.8298C9.71532 2.61555 9.41806 2.42993 9.10167 2.27344C8.19293 1.82398 7.37539 1.66666 6.21228 1.66666C3.09719 1.66666 0.833496 4.24772 0.833496 7.59989C0.833496 10.1315 2.24502 12.5769 4.8742 14.9416C6.25424 16.1828 8.01626 17.4111 9.27816 18.0646L10.0002 18.4384L10.7222 18.0646C11.9841 17.4111 13.7461 16.1828 15.1261 14.9416C17.7553 12.5769 19.1668 10.1315 19.1668 7.59989C19.1668 4.2832 16.8818 1.67946 13.7945 1.66668ZM17.5002 7.59989C17.5002 9.58325 16.322 11.6244 14.0116 13.7024C12.752 14.8353 11.1326 15.9674 10.0002 16.5614C8.86769 15.9674 7.24835 14.8353 5.98873 13.7024C3.67835 11.6244 2.50016 9.58325 2.50016 7.59989C2.50016 5.1231 4.06986 3.33333 6.21228 3.33333C7.13706 3.33333 7.70693 3.44299 8.36277 3.76737C8.75017 3.95897 9.09256 4.21197 9.38894 4.52814L10.0021 5.18225L10.6097 4.52296C10.9128 4.19412 11.2602 3.93536 11.6518 3.74369C12.2884 3.43207 12.8227 3.33333 13.7911 3.33334C15.907 3.34211 17.5002 5.15747 17.5002 7.59989Z" fill="#333333"/>
                    </svg>
                    <MenuText>喜欢</MenuText>
                  </ExtendedButton>
                  <ExtendedButton as="a" href="#">
                    <svg width="20" height="20" viewBox="0 0 12 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M0.166504 17.8484L5.99984 14.9317L11.8332 17.8484V2.33333C11.8332 1.41286 11.087 0.666667 10.1665 0.666667H1.83317C0.912696 0.666667 0.166504 1.41286 0.166504 2.33333V17.8484ZM5.99984 13.0683L1.83317 15.1516V2.33333H10.1665V15.1516L5.99984 13.0683Z" fill="#333333"/>
                    </svg>
                    <MenuText>标签</MenuText>
                  </ExtendedButton>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      {children}
      <div>
        <button onClick={() => setShowAll(!showAll)}>
        show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note =>
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        )}
      </ul>
    </>
  );
};

export default Notes;