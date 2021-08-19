import styled from "styled-components";

const Finput = styled.input`
  border: 2px solid #0C2D48;
  border-radius: ${p => p.radius ?? '0px'};
  height: 3rem;
  padding: 0px 16px;
  font-size: 1.8vh;
  background-color: #464649;
  color: white;
  transition: border-color .5s;
  width: 100%;
  box-sizing: border-box;

  &:hover{
    border: 2px solid #B1D4E0;
  }

  &:focus{
    outline: none;
    border: 2px solid #DB1F48;
    background-color: #0E0E10;
  }
`;

export default Finput;