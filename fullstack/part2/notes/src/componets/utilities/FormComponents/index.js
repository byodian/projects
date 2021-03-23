import styled, { css } from 'styled-components';

export const Label = styled.label`
  font-weight: bold;
  font-size: 1.4rem;
  margin-bottom: var(--space-4);
`;

export const Input = styled.input`
  display: block;
  width: 100%;
  padding: var(--space-4) var(--space-8);
  border-radius: var(--radius-md);
  border: 1px solid #333;
  outline: none;

  &::placeholder {
    color: var(--color-grey-05);
    font-size: 1.4rem;
  }

  &:focus:invalid {
    border-color: var(--main-color-highlight);
  }

  &:focus:valid {
    border-color: var(--color-green-05);
  }
`;

export const Button = styled.button`
  display: inline-block;
  padding: 0.8rem 1.6rem;
  background-color: #333;
  border-radius: var(--radius-xl);
  font-size: var(--heading-sm-font-size);
  white-space: nowrap;
  min-width: 13rem;
  color: #fff;
  text-align: center;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #000;
  }

  ${props =>
    props.primary &&
    css`
      background: palevioletred;
      color: white;
  `}
`;

