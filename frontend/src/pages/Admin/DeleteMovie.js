import { useState } from "react";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { loaded, loading } from "../../redux_slices/loadingSlice";
import { deleteMovieById } from "../../requests";
import FButton from "../../styled_components/FButton"
import Finput from "../../styled_components/Finput"

const DeleteMovie = ({title}) => {
  const [info, setInfo] = useState('');
  const inputref = useRef();
  const dispatch = useDispatch();

  const onDeleteMovieClicked = async () => {
    dispatch(loading());
    const movieId = inputref.current.value;
    if(movieId){
      const response = await deleteMovieById(movieId);
      console.log(response);
      if(response.status === 200){
        setInfo(response.data);
      }else{
        setInfo("There is a problem in here!");
      }
    }else{
      setInfo("Give me an id");
    }
    dispatch(loaded());
  };

  return (
    <>
      <div className="content-title">
        {title}
      </div>
      {
        info ?  
        <div className="content-info">
          {info}
        </div> : null
      }
     

      <form className="content-form">
        <Finput ref={inputref} className="movie-input" placeholder="Movie id" required/>
        <FButton type="button" onClick={onDeleteMovieClicked}>Delete Movie</FButton>
      </form>
    </>
  )
};

export default DeleteMovie;