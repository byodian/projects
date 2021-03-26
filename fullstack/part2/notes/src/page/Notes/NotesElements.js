import styled from 'styled-components';
import { MenuButton } from '../../components/StyledElements/Button';

export const ExtendedButton = styled(MenuButton)`
  padding: var(--space-12) var(--space-16);

  &:focus {
    background-color: var(--main-color);
    color: #fff;
  }

  &:focus path {
    fill: #fff;
  }
`;

export const Main = styled.main`
  min-height: calc(100vh - var(--space-48));
  padding: var(--space-32) var(--space-16);

  @media screen and (min-width: 680px) {
    width: 100%;
    max-width: 680px;
    margin: 0 auto;
  }
`;

export const NoteItems = styled.ul`
`;