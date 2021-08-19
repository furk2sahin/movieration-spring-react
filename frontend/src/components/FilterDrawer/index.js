import { FaAngleDown, FaSearch } from "react-icons/fa";
import styled from "styled-components";
import FilterElement from "./FilterElement";
import Divider from "../../styled_components/Divider";
import useScreenWidth from "../../hooks/useScreenWidth";
import { useState } from "react";

const FilterDrawer = () => {

  const [screenWidth, isMobile] = useScreenWidth();

  const [ isActive, setIsActive ] = useState(false);

  const showFilterDrawer = () => {
    setIsActive(!isActive);
  };

  const ariaShouldExpand = () => {
    if( isMobile && isActive) {
      return true;
    }

    if(isMobile && !isActive) {
      return false;
    }

    if(!isMobile){
      return true;
    }
  }

  return (
    <StyledFilterDiv>

      <TitleDiv>
        <FaSearch />
        <span className="title-name">Filter</span>
        { isMobile ? <FaAngleDown onClick={showFilterDrawer}/> : null }
        
      </TitleDiv>
      <Divider height="4px"/>

      <div className="filter-content" aria-expanded={ariaShouldExpand()}>
        <FilterElement title="Category"/>
        <Divider height="1px"/>
        <FilterElement title="Mood"/>
      </div>
      

    </StyledFilterDiv>
  );
}

const StyledFilterDiv = styled.div`
  width: 300px;
  background-color: var(--primarylight-color);
  padding-top: 10px;
  margin-right: 4px;
  overflow-y: auto;

  @media only screen and (max-width: 985px) {
      /* mobile */
    width: 100%;
  }

  .filter-content {
    &[aria-expanded="true"] {
      display: block;
    }

    &[aria-expanded="false"] {
      display: none;
    }
  }
`;

const TitleDiv = styled.div`
  display:flex;
  align-items: center;
  padding: 10px 24px;
  font-size: 1.5rem;
  margin-bottom: 4px;
  font-weight: bold;
  
  .title-name { 
    margin-left: 10px;
    flex: 1;
  }
`;

export default FilterDrawer;