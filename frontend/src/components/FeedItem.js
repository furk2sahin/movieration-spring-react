import { FaStar } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const FeedItem = ({ movieData }) => {
  const history = useHistory();

  const onMovieClicked = () => {
    history.push(`/movie/${movieData.id}`);
  };

  return (
    <BaseFeed onClick={onMovieClicked}>
      <div className="feed-header">
        <div className="feed-title">{movieData.name}</div>
        <div className="feed-right">
          <span>{movieData.rating.toFixed(1)}/5.0</span>
          <FaStar />
        </div>
      </div>
      <StyledContainerDiv>
        <div className="feed-thumbnail">
          <img src={movieData.thumbnail} alt="" />
        </div>
        <div className="feed-details">
          <div className="feed-desc">{movieData.description}</div>
          <div className="feed-categories">
            <div><b>Categories</b></div>
            <ul>
              {
                movieData.categories.map((category, index) => <li key={`${movieData.name}-${index}`} className="cat-el">{category.genre}{movieData.categories.length - 1 !== index ? ',' : ''}</li>)
              }
            </ul>
          </div>
          <div className="feed-director">
            <div><b>Director</b></div>
            {movieData.director}
          </div>
        </div>
      </StyledContainerDiv>
    </BaseFeed>
  );
};

const BaseFeed = styled.div`
  --feed-height: 300px;
  --header-height: 50px;
  --container-height: 250px;
  --thumbnail-width: 180px;
  display: flex;
  flex-direction: column;
  height: var(--feed-height);
  padding: 12px;
  transition: opacity 0.3s;
  border-bottom: 2px solid black;
  box-sizing: content-box;
  &:hover {
    z-index: 2;
    opacity: .7;
    cursor: pointer;
  }

  .feed-header {
    height: var(--header-height);
    display:flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    font-size: 1.6rem;
    .feed-title{
      font-weight: bold;
      color: var(--unique-text);
    }

    .feed-right{
      color: yellow;
      display: flex;
      span {
        margin-right: 6px;
      }
    }
    
  }

  @media only screen and (max-width: 768px) {
    /* mobile */
    box-sizing: border-box;
    --container-height: 200px;
    --thumbnail-width: 140px;
  }
`;

const StyledContainerDiv = styled.div`
  height: var(--container-height);
  display: flex;
  color: var(--primary-text);
  font-size: 1.2rem;
  
  .feed-thumbnail {
    img {
      width: var(--thumbnail-width);
      height: var(--container-height);
      box-shadow: 0px 0px 4px 3px rgba(0,0,0,0.5);
    }
  }

  .feed-details {
    display:flex;
    flex-direction: column;
    padding: 0px 12px;
    overflow-y: auto;

    .feed-desc {
      color: var(--secondary-text);
      margin-bottom: 12px;
    }

    .feed-categories {
      margin-bottom: 12px;
      
      ul{
        display: flex;
        flex-wrap: wrap;
        padding: 0;
        margin: 0;
        list-style-type: none;
      }

      .feed-cat-el {
        margin-right: 10px;
        list-style: none;
      }
    }
  }
`;

export default FeedItem;