import { useState } from "react";
import { useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { GiDeathSkull } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Header from "../../components/Header"
import { loaded, loading } from "../../redux_slices/loadingSlice";
import { addWatchedMovie, deleteWatchedMovieById, getCommentsByMovieId, getCommentsByUserId, getMovieById, getWatchedMoviesByUserId } from "../../requests";
import MovieComments from "./MovieComments";
import WriteComment from "./WriteComment";

const MoviePage = ({ match, history }) => {
  const [movieData, setmovieData] = useState();
  const [comments, setComments] = useState([]);
  const [userAlreadyCommented, setUserAlreadyCommented] = useState(false);
  const [watchedMovieData, setWatchedMovieData] = useState();
  const isLoading = useSelector(state => state.loading.value);
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    getMovie();
  }, []);

  const getMovie = async () => {
    dispatch(loading());

    const movieId = match.params.id;
    const movieResponse = await getMovieById(movieId);

    if (movieResponse.status === 200) {
      setmovieData(movieResponse.data);
      const watchedResponse = await getWatchedMoviesByUserId(user.id);
      if (watchedResponse.status === 200) {
        const watchedData = watchedResponse.data.find(watched => watched.user.id == user.id && watched.movie.id == movieId);
        setWatchedMovieData(watchedData);
      }
      const commentsResponse = await getCommentsByMovieId(movieId);
      if (commentsResponse.status === 200) {
        setUserAlreadyCommented(commentsResponse.data.find(comment => comment.user.id === user.id) ? true : false);
        setComments(commentsResponse.data ? commentsResponse.data : []);
      }
    }
    dispatch(loaded());
  };

  const setWatched = async () => {
    dispatch(loading());
    if (watchedMovieData) {
      const response = await deleteWatchedMovieById(watchedMovieData.id);
      if (response.status === 200) {
        setWatchedMovieData(null);
      }
    } else {
      const watchedData = {
        movie: { id: movieData.id },
        user: { id: user.id }
      };
      const response = await addWatchedMovie(watchedData);
      if (response.status === 200) {
        setWatchedMovieData(response.data);
      }
    }
    dispatch(loaded());
  };

  const removeComment = (id) => {
    const deletedComment = comments.filter(comment => comment.id === id);
    if (deletedComment[0].user.id === user.id) {
      setUserAlreadyCommented(false);
    }
    setComments(comments.filter(comment => comment.id !== id));
  }

  const commentWrited = async (comment) => {
    const response = await getCommentsByUserId(user.id);
    if (response.status === 200) {
      const _comment = response.data.filter(c => movieData.id === c.movie.id);
      setComments([...comments, _comment[0]]);
      if (comment.user.id === user.id) {
        setUserAlreadyCommented(true);
      }
    }
  }

  return (
    <StyledMoviePage>
      <Header />

      <div className="movie-page">
        {
          isLoading ? <div className="movie-loading">Loading...</div> :
            <StyledMovieContainer>
              <div className="movie-thumbnail">
                {movieData ? <img src={movieData.thumbnail} alt="" /> : <GiDeathSkull color="white" size={200} />}
              </div>
              <StyledMovieDetails>
                {
                  movieData ?
                    <>
                      <div className="movie-title">
                        <span>{movieData.name}</span>
                        <span className="movie-watch-icon">
                          {
                            watchedMovieData ? <FaEyeSlash onClick={setWatched} color="white" size={36} /> : <FaEye onClick={setWatched} color="white" size={36} />
                          }
                        </span>
                      </div>
                      <div className="movie-terms">
                        <span>{movieData.releaseDate}</span>
                        <span> | </span>
                        <span>{movieData.categories?.map((cat, i) => movieData.categories.length - 1 === i ? <span key={`cat-${i}`}>{cat.genre}</span> : <span key={`cat-${i}`}>{cat.genre}, </span>)}</span>
                        <span> | </span>
                        <span>{movieData.director}</span>
                      </div>
                      <div className="movie-description">
                        {movieData.description}
                      </div>
                    </> :
                    <>
                      <div className="movie-title">
                        <span>There is no movie in that id</span>
                      </div>
                      <div className="movie-description">
                        No movie here!
                      </div>
                    </>
                }
              </StyledMovieDetails>
            </StyledMovieContainer>
        }
        {
          !userAlreadyCommented && movieData ?
            <WriteComment movieId={movieData.id} commentWrited={commentWrited} /> : null
        }
        {
          comments && comments.length > 0 ?
            <MovieComments isAdmin={user.role === "ADMIN"} comments={comments} removeComment={removeComment} /> : null
        }
      </div>
    </StyledMoviePage>
  );
};


const StyledMoviePage = styled.div`
  height: 100vh;

  .movie-page {
    height: 92%;
    overflow-y: auto;
  }
`;

const StyledMovieContainer = styled.div`
  width: var(--app-width);
  margin: 12px auto;
  height: 364px;
  background-color: var(--primarylight-color);
  box-shadow: 0px 0px 5px 2px black;
  padding: 12px;
  display: flex;
  .movie-thumbnail {
    max-width: 400px;
    margin-right: 12px;
    img {
      width: 100%;
      height: 100%;
    }
  }

  @media only screen and (max-width: 985px) {
    /* mobile */
    width: 100%; 
    height: unset; 
    .movie-thumbnail{
      width: 100px;
      img {
        height: unset;
      }

      svg {
        width: 100px;
        height: 100px;
      }
    }
  }
`;

const StyledMovieDetails = styled.div`
  flex: 1;
  color: var(--primary-text);
  font-size: 1.3rem;
  line-height: 1.4em;
  .movie-title {
    font-size: 2rem;
    font-weight: bold;
    color: var(--unique-text);
    padding: 6px 0px;
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    line-height: 1em;

    .movie-watch-icon{
      &:hover {
        cursor: pointer;
      }
    }
  }

  .movie-terms {
    color: var(--secondary-text);
    margin-bottom: 12px;
  }

  .movie-description {
    color: var(--primary-text);
  }
`;

export default MoviePage;