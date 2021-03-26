import styled from 'styled-components';
import { BsPlus } from 'react-icons/bs';

export const PlusIcon = styled(BsPlus)`
  width: 24px;
  height: 24px;
  fill: var(--main-color-highlight);
`;

export const FloatingContainer = styled.div`
  position: fixed;
  bottom: var(--space-16);
  right: var(--space-24);
  z-index: 400;

  @media screen and (min-width: 1120px) {
    right: 12%;
  }
`;

export const FloatingActionButton = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 56px;
  height: 56px;
  cursor: pointer;
  user-select: none;
  background-color: var(--color-grey-02);
  border-radius: 50%;
  box-shadow: 0px 3px 5px 1px rgb(0 0 0 / 20%);
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: var(--color-grey-03);
  }
`;