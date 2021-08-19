import styled from "styled-components";
import Divider from "../../styled_components/Divider";

const AdminDrawer = ({ pages }) => {

  return (
    <StyledDrawerDiv>
      <StyledTitleDiv>
        Admin Page
      </StyledTitleDiv>
      <Divider height="2px"/>
      {
        pages.map( (page, i) => <StyledElementDiv key={`${page.title}-${i}`} onClick={page.onClick}>{page.title}</StyledElementDiv>)
      }

    </StyledDrawerDiv>
  );
};

const StyledDrawerDiv = styled.div`
  width: 300px;
  height: 100%;
  color: var(--primary-text);
  background-color: var(--primarylight-color);
  box-shadow: 3px 0px 3px black;
`;

const StyledTitleDiv = styled.div`
  padding: 24px 12px;
  font-size: 2rem;
`;

const StyledElementDiv = styled.div`
  font-size: 1.2rem;
  padding: 16px 24px;

  &:hover {
    cursor: pointer;
    background-color: var(--secondary-color);
  }
`;


export default AdminDrawer;