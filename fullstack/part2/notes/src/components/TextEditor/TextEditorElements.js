import styled from 'styled-components';
import { Button } from '../StyledElements/Button';

export const EditorContainer = styled.div`
  position: relative;
  margin-bottom: var(--space-32);
`;

export const SubmitButton = styled(Button)`
  position: absolute;
  bottom: var(--space-8); 
  right: var(--space-32);
  min-width: 4rem;
  padding: var(--space-4);
  font-size: 1.2rem;
`;