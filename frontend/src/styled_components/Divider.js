import styled, { css } from "styled-components";

const Divider = styled.div`
  width: 100%;
  height: ${props => props.height};
  background-color: ${ props => props.color ? props.color : css`var(--secondary-color)` } ;
`;

export default Divider;