import { VscLoading } from "react-icons/vsc";
import styled, { keyframes } from "styled-components";

const Loading = ({ active }) => {
  return (
    <StyledLoadingDiv active={active}>
      <div className="loading-icon">
        <VscLoading size={200}/>
      </div>
    </StyledLoadingDiv>
  );
};

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const StyledLoadingDiv = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.5);
  display: ${({active}) => active ? 'block' : 'none'};
  z-index: 100;
  .loading-icon{
    position: relative;
    color: var(--primary-text);
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    width: 200px;
    height: 200px;
    & > * {
      animation: ${spin} 1s linear infinite;
    }
  }

`;

export default Loading;