import { FaStar } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import styled from "styled-components";
import Divider from "../../styled_components/Divider";
import { useDispatch } from "react-redux";
import { loaded, loading } from "../../redux_slices/loadingSlice";
import { deleteCommentById } from "../../requests";
import { useHistory } from "react-router-dom";


const MovieComments = ({isAdmin, comments, removeComment}) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const onDeleteComment = async (id) => {
    dispatch(loading());
    
    const response = await deleteCommentById(id);
    if(response.status === 200){
      removeComment(id);
    }else{
      alert("There is an error");
    }

    dispatch(loaded());
  }

  return (
    <StyledMovieComments>
      {comments.map((commentData, index) => {
        return (
          <StyledComment key={`comment-${commentData.id}-${index}`}>
            <div className="comment-title">
              <div className="comment-user">@{commentData.user.username}</div>
              <div className="comment-right">
                <div className="comment-rate"><FaStar size={24}/> <span className="comment-rate-value">{commentData.rate}</span></div>
                {
                  isAdmin ? 
                  <AiFillDelete onClick={()=>onDeleteComment(commentData.id)} className="delete-icon" color="red" size={24}/> : null
                }
              </div>
            </div>
            <div className="comment-desc">{commentData.comment}</div>
            {
              comments.length - 1 !== index ? <Divider height="2px"/> : null
            }
          </StyledComment>
        )
      })
      }
    </StyledMovieComments>
  );
};



const StyledMovieComments = styled.div`
  margin: 12px auto;
  width: calc(var(--app-width) / 2);
  min-height: 100px;
  box-shadow: 0px 0px 5px 2px black;
  background-color: var(--primarylight-color);

  @media only screen and (max-width: 768px) {
    /* mobile */
    width: 100%;
  }

  .no-comment{
    color: var(--primary-text);
    padding: 12px;
    font-size: 1.3rem;

  }
`;

const StyledComment = styled.div` 
  padding: 12px;
  
  .comment-title {
    display: flex;
    justify-content: space-between;
    font-size: 1.4rem;
    color: var(--primary-text);
    margin-bottom: 12px;
  }

  .comment-right{
    display: flex;

    .delete-icon{
      &:hover{
        cursor:pointer;
      }
    }
  }

  .comment-rate {
    margin-right: 8px;
    display: flex;
    align-items: center;

    span {
      margin-left: 4px;
    }
  }

  .comment-desc{
    color: var(--secondary-text);
    font-size: 1.1rem;
    margin-bottom: 12px;
  }
`;


export default MovieComments;