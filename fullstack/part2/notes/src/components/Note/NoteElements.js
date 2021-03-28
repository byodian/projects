import styled from 'styled-components';

export const NoteItem = styled.li`
  margin-bottom: var(--space-16);
`;

export const NoteContentWrap = styled.div`
  display: block;
  padding: var(--space-16);
  background-color: #fff;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: var(--color-grey-02);
  }

  &:focus {
    background-color: var(--color-grey-03);
  }

  a {
      text-decoration: underline;
  }

  ul {
    padding: 0 4.0rem;
    list-style-type: disc;
  }
`;

export const NoteContent = styled.div``;

export const NoteTime = styled.time`
  display: block;
  font-size: 1.4rem;
  color: var(--color-grey-06);
  margin-bottom: var(--space-16);
`;

export const NoteButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const IconWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;

  &:hover {
    background-color: rgba(238, 82, 68, 0.1);
  }

  &:hover svg {
    color: var(--color-red-03);
  }
`;


