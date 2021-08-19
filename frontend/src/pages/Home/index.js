import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import FeedItem from "../../components/FeedItem";
import FilterDrawer from "../../components/FilterDrawer";
import Header from "../../components/Header";
import { getAllMovies, getMoviesByCategoryId, getMoviesByEmotionId } from "../../requests";
import {loaded, loading} from "../../redux_slices/loadingSlice";

const Home = ({ match }) => {
  const [movies, setMovies] = useState(null);
  const [filteredMovies, setFilteredMovies] = useState(null);
  const dispatch = useDispatch();
  const filterId = match.params?.id;
  const filterOption = match.url.split('/')[1];

  useEffect(() => {
    if(!filterId){
      // HOME PAGE
      getMovies();
    }else {
      // CATEGORY PAGE
      if(filterOption === "category"){
        getMoviesByCategory();
      }else{
        getMoviesByEmotion();
      }
    }
  }, [filterId]);

  const getMovies = async () => {
    dispatch(loading());
    const response = await getAllMovies();
    if(response.status === 200){
      if(filterOption === "populer"){
        setMovies(response.data.sort((a,b) => b.rating - a.rating));
      }else{
        setMovies(response.data);
      }
    }
    dispatch(loaded());
  }

  const getMoviesByCategory = async () => {
    dispatch(loading());
    const response = await getMoviesByCategoryId(filterId);
    if(response.status === 200){
      setMovies(response.data);
    }
    dispatch(loaded());
  };

  const getMoviesByEmotion = async () => {
    dispatch(loading());
    const response = await getMoviesByEmotionId(filterId);
    if(response.status === 200){
      setMovies(response.data);
    }
    dispatch(loaded());
  }

  const searchMovieByName = (name) => {
    if(movies){
      if(name === "") return setFilteredMovies("");
      const _filteredMovies = movies.filter((movie, index) => movie.name.toLowerCase().includes(name.toLowerCase()));
      setFilteredMovies(_filteredMovies);
    }
  };

  return (
    <BaseHome>
      <Header onSearch={searchMovieByName}/>
    
      <div className="home-col">
        <FilterDrawer />
        <HomeFeed>
          {
            filteredMovies ? filteredMovies.map((movie, index) => <FeedItem key={`${movie.id}-${index}`} movieData={movie}/>) : 
            movies?.map((movie, index) => <FeedItem key={`${movie.id}-${index}`} movieData={movie}/>)
          }
        </HomeFeed> 

      </div>

    </BaseHome>
  );
};

const BaseHome = styled.div`
  height:100vh;
  .home-col {
    width: var(--app-width);
    display:flex;
    z-index: 0;
    height: 92vh;
    color: var(--primary-text);
    margin: 0 auto;
    box-shadow: 0px 0px 5px 2px black;
    
    @media only screen and (max-width: 985px) {
      /* mobile */
      width: 100%;
      flex-direction: column;
    }
  }
`;



const HomeFeed = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  flex: 1;
  background-color: var(--primarylight-color);
`;

export default Home;