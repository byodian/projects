import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const NoteItem = styled.li`
  margin-bottom: var(--space-16);
`;

export const NoteLink = styled(Link)`
  display: block;
  padding: var(--space-8);
  /* border: 1px solid var(--main-color); */
  background-color: #fff;
  border-radius: var(--radius-md);
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: var(--color-grey-02);
  }

  &:focus {
    background-color: var(--color-grey-03);
  }
`;

export const NoteContent = styled.div``;

export const NoteTime = styled.time`
  display: block;
  font-size: 1.4rem;
  color: var(--color-grey-06);
  margin-bottom: var(--space-16);
`;
