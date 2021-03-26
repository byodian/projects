import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const SidebarContainer = styled.nav`
  --width: 18.0rem;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: var(--width);
  background-color: #fff;
  opacity: ${props => props.isOpen ? '1' : '0'};
  transform: translateX(${props => props.isOpen ? 0 : '-18rem'});
  transition: all .3s ease-in-out;
  z-index: 400;

  @media screen and (min-width: 424px) {
  }
`;

export const SidebarWrap = styled.div`
`;

export const SidebarMenu = styled.ul`
`;

export const SidebarItem = styled.li`
`;

export const SidebarLink = styled(Link)`
  display: flex;
  align-items: center;
  padding: var(--space-8) var(--space-16);
  margin-left: 1px;
  margin-right: 1px;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: var(--color-grey-01);
  }

  &:focus {
    background-color: var(--color-grey-03);
  }

  span {
    margin-left: var(--space-16);
  }
`;