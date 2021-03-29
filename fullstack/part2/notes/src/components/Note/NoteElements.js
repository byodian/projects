import styled from 'styled-components';
import { Link } from 'react-router-dom';

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
      color: var(--color-tw-primary);
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

export const NoteGroup = styled.div`
  display: flex;
  justify-content: flex-start;
`;

export const IconGroup = styled.div`
  margin-left: auto;
  display: flex;
`;

export const IconWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  margin-right: var(--space-8);
  color: var(--main-color);


  &:hover {
    background-color: rgba(238, 82, 68, 0.1);
  }

  &:hover svg {
    color: var(--color-red-03);
  }
`;


export const TagsWrap = styled.div`
  font-size: 1.2rem;
`;

export const Tag = styled(Link)`
  display: inline-flex;
  margin-right: var(--space-8);
  padding: var(--space-4) var(--space-8); 
  background-color: var(--color-grey-02);
  border-radius: var(--radius-md);
  color: var(--color-tw-primary);
`;

