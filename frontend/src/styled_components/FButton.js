import styled from "styled-components";

const FButton = styled.button`
  width: ${({width}) => width ? width: 'unset'};
  height: ${({height})=> height ? height: '52px'};
  border: none;
  background-color: #BF1A2F;
  color: white;
  font-weight: bold;
  font-size: 1rem;
  margin-top: 20px;

  &:hover {
    cursor: pointer;
    background-color: #ad1a2e;
  }
`;

export default FButton;