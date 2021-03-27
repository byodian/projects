import { FaTimes, FaBars, FaPlus } from 'react-icons/fa';
import styled from 'styled-components';

export const CloseIcon = styled(FaTimes)`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

export const Hamburger = styled(FaBars)`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

export const PlusIcon = styled(FaPlus)`
  width: 15px;
  height: 15px;
  fill: var(--main-color-highlight);
`;

export const Icon = styled.div`
  display: flex;
  align-items: center;
  height: var(--space-48);
  padding-left: var(--space-16);
  margin-bottom: var(--space-16);
  font-size: 2rem;
`;

