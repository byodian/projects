import styled from 'styled-components';
import { EyeOpenedIcon, EyeHidedIcon } from '../StyledElements/Icon';
import { Input } from '../StyledElements/Input';
export const TogglePassword = styled.div`
  position: relative;
`;

export const PasswordInput = styled(Input)``;

export const ButtonWrap = styled.span`
  position: absolute; 
  right: var(--space-4);
  top: 0;
  bottom: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  margin-top: auto;
  margin-bottom: auto;
  color: var(--color-grey-06); 
`;

export const EyeOpenedButton = styled(EyeOpenedIcon)`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

export const EyeHidedButton = styled(EyeHidedIcon)`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;