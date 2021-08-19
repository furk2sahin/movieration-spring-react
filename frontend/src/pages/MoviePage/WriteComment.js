import { useState } from 'react';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Rating } from 'semantic-ui-react';
import styled from 'styled-components';
import { loaded, loading } from '../../redux_slices/loadingSlice';
import { addCommentToMovie } from '../../requests';

const WriteComment = ({ movieId, commentWrited }) => {
  const [currentRate, setCurrentRate] = useState(0);
  const textAreaRef = useRef();
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();

  const onCommentSend = async () => {
    dispatch(loading());
    const comment = textAreaRef.current.value;
    if (!comment) {
      dispatch(loaded());
      return alert("Give me a comment please!");
    }
    if (currentRate < 1) {
      dispatch(loaded());
      return alert("Rate should be at least 1");
    }
    const commentData = {
      comment,
      rate: currentRate,
      user: { id: user.id },
      movie: { id: movieId }
    };
    const response = await addCommentToMovie(commentData);
    if (response.status === 200) {
      await commentWrited(commentData);
    }
    dispatch(loaded());
  };

  const onRate = (e, data) => {
    setCurrentRate(data.rating);
  };

  return (
    <StyledWriteCommentDiv>
      <StyledWriteCommentTitleDiv>
        <StyledThumbnailSpan>
          <img src={user.image ? user.image : user.gender === "FEMALE" ? "/assets/images/female.png" : "/assets/images/male.png"} alt="" />
        </StyledThumbnailSpan>
        <span className="writecomment-username">@{user.username}</span>
      </StyledWriteCommentTitleDiv>
      <StyledWriteContainerDiv>
        <textarea ref={textAreaRef} name="comment" placeholder="Write comment!"></textarea>
        <div className="writecomment-footer">
          <div>
            <span>Rate </span>
            <Rating size="large" className="writecomment-rating" icon="star" defaultRating={currentRate} maxRating="5" onRate={onRate} />
          </div>
          <button onClick={onCommentSend}>Send</button>
        </div>
      </StyledWriteContainerDiv>
    </StyledWriteCommentDiv>
  );
};

const StyledWriteCommentDiv = styled.div`
  --writecomment-height: 200px;
  margin: 12px auto;
  width: var(--app-width);
  height: var(--writecomment-height);
  display: flex;

  @media only screen and (max-width: 985px) {
    /* mobile */
    width: 100%;
  }
`;

const StyledWriteCommentTitleDiv = styled.div`
  --commentTitle-width: 100px;
  display: flex;
  flex-direction: column;
  color: var(--primary-text);
  margin-right: 12px;
  width: var(--commentTitle-width);
  box-sizing: border-box;
  overflow: hidden;

  .writecomment-username {
    font-size: 1.1rem;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const StyledThumbnailSpan = styled.span`
  width: var(--commentTitle-width);
  img {
    width: 100%;
    height: 100%;
  }
`;

const StyledWriteContainerDiv = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  textarea {
    flex: 1;
    margin-bottom: 8px;
    font-size: 1.4rem;
    padding: 12px;
    &:focus{
      outline: none;
    }
  }

  .writecomment-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: var(--primary-text);
    font-size: 1.2rem;
    .writecomment-rating {
      & > * {
        color: white !important;
      }
    }

    button {
      width: 140px;
      height: 52px;
      border: none;
      background-color: #BF1A2F;
      color: white;
      font-weight: bold;
      font-size: 1rem;
  
      &:hover {
        cursor: pointer;
        background-color: #ad1a2e;
      }
    }
  }

`;

export default WriteComment;