import styled from "styled-components";
import { Link } from "react-router-dom";
import { GiAmmoniteFossil, GiBroadsword, GiBrokenHeart, GiDiamondsSmile, GiDramaMasks, GiDreamCatcher, GiDualityMask, GiMaterialsScience, GiOpenBook, GiPistolGun, GiWalk, GiWhiteBook } from "react-icons/gi";
import { ImAngry, ImConfused, ImHappy, ImNeutral, ImSad, ImShocked } from "react-icons/im";
import { useState } from "react";
import { useEffect } from "react";
import { getAllCategories, getAllEmotions } from "../../requests";

const iconSize = 24;

const categoryIcons = {
  ACTION: <GiBroadsword size={iconSize} />,
  COMEDY: <GiDiamondsSmile size={iconSize} />,
  ADVENTURE: <GiWalk size={iconSize} />,
  ANIMATION: <GiAmmoniteFossil size={iconSize} />,
  FANTASY: <GiDreamCatcher size={iconSize} />,
  'SCI-FI': <GiMaterialsScience size={iconSize} />,
  'WAR/DRAMA': <GiDramaMasks size={iconSize} />,
  ROMANTIC: <GiBrokenHeart size={iconSize}/>,
  HISTORY: <GiWhiteBook size={iconSize}/>,
  CRIME: <GiPistolGun size={iconSize}/>,
  DOCUMENTARY: <GiOpenBook size={iconSize} />,
  HORROR: <GiDualityMask size={iconSize} />
};

const emotionIcons = {
  HAPPY: <ImHappy size={iconSize}/>,
  SAD: <ImSad size={iconSize} />,
  ANGRY: <ImAngry size={iconSize} />,
  SURPRISED: <ImShocked size={iconSize} />,
  CALM: <ImNeutral size={iconSize} />,
  FEAR: <ImConfused size={iconSize} />,
}

const FilterElement = ({ title }) => {

  const [ categories, setCategories ] = useState();
  const [ emotions, setEmotions ] = useState();

  useEffect(()=>{
    getCategories();
    getEmotions();
  }, []);

  
  const getCategories = async () => {
    const response = await getAllCategories();
    if(response.status === 200){
      setCategories(response.data);
    }
  };

  const getEmotions = async () => {
    const response = await getAllEmotions();
    if(response.status === 200){
      setEmotions(response.data);
    }
  };
  
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  
  const listItem = (id, title, isCategory) => {
    return (
      <li key={`${title}-${id}`} className="filter-field">
        <Link to={`/${isCategory ? 'category' : 'mood'}/${id}`}>
          <span className="field-icon">{isCategory ? categoryIcons[title] : emotionIcons[title]}</span>
          <span className="field-name">{capitalizeFirstLetter(title.toLowerCase())}</span>
        </Link>
      </li>
    );
  };
  
  return (
    <StyledFilterElement>
      <TitleDiv>{title}</TitleDiv>

      <ul className="filter-field-list">
      {
        title === "Category" ? 
        categories?.map((val) => listItem(val.id, val.genre, true)) : 
        emotions?.map((val) => listItem(val.id, val.emotion))
      }
      </ul>    
    </StyledFilterElement>

  );
}

const StyledFilterElement = styled.div`
  --field-height: 48px;

  display: flex;
  flex-direction: column;
  padding: 24px 0px 12px 0px;
  font-size: 1.4rem;

  .filter-field-title{

  }

  .filter-field-list {
    padding: 0;
    margin: 0;
  }

  .filter-field {
    display:block;
    width: 100%;
    a {
      display: flex;
      height: var(--field-height);
      align-items: center;
      box-sizing: border-box;
      justify-content: center;
      color: var(--primary-text);
      padding: 0 24px;
      &:hover {
        background-color: #383838;
      }

      .field-icon {
        margin-right: 24px;
      }

      .field-name{
        flex:1;
      }
    }
  }
`;

const TitleDiv = styled.div`
  box-sizing: border-box;
  margin-bottom: 12px;
  padding: 0 24px;
  color: var(--secondary-text);
`;

export default FilterElement;