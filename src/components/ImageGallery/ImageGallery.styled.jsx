import styled from 'styled-components';

export const List = styled.ul`
  display: grid;
  max-width: calc(100vw - 48px);
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-gap: 16px;
  margin-top: 0;
  margin-bottom: 0;
  padding: 0;
  list-style: none;
  margin-left: auto;
  margin-right: auto;
`;

export const Message = styled.p`
  margin-right: auto;
  margin-left: auto;
  font-size: 32px;
`;

export const ErrorWrapper = styled.div`
  margin-right: auto;
  margin-left: auto;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const Span = styled.span`
  color: red;
`;
