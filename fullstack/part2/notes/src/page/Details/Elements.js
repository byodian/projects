import styled from 'styled-components';

export const DetailsWrap = styled.div`
  min-height: calc(100vh - var(--space-48));
  padding: var(--space-32) var(--space-16);

  a {
      text-decoration: underline;
  }

  ul {
    padding: 0 4.0rem;
    list-style-type: disc;
  }

  @media screen and (min-width: 680px) {
    width: 100%;
    max-width: 680px;
    margin: 0 auto;
  }
`;