import { FaTimes } from 'react-icons/fa';
import styled from 'styled-components';

export const CloseIcon = styled(FaTimes)`
  cursor: pointer;
`;

export const Icon = styled.div`
  display: flex;
  align-items: center;
  height: var(--space-48);
  padding-left: var(--space-16);
  margin-bottom: var(--space-16);
  font-size: 2rem;
`;