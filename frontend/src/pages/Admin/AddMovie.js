import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addMovie, getAllCategories } from "../../requests";
import Finput from "../../styled_components/Finput";
import { loaded, loading } from "../../redux_slices/loadingSlice";
import { Dropdown } from "semantic-ui-react";
import FButton from "../../styled_components/FButton";


const AddMovie = ({title}) => {

  const [categories, setCategories] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [info, setInfo] = useState('');
  const dispatch = useDispatch();
  
  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    dispatch(loading());
    let response = await getAllCategories();

    if(response.status === 200){
      const _categories = response.data.map((category) => (
        {
          key: category.genre,
          text: category.genre,
          value: category.id,
        }
      ));
      setCategories(_categories);
    } 
    dispatch(loaded());
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(loading());
    const thumbnail64 = await getBase64(e.target[5].files[0]);
    const movieData = {
      name: e.target[0].value,
      description: e.target[1].value,
      director: e.target[2].value,
      releaseDate: e.target[3].value,
      budget: e.target[4].value,
      thumbnail: thumbnail64,
      categories: selectedCategories
    }
    console.log(movieData);
    const response = await addMovie(movieData);
    if(response.status === 200){
      setInfo("Movie added!");
    }else{
      setInfo("There is a problem in here!");
    }
    dispatch(loaded());
  };

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  } 

  const onCategoryDropdownChange = (e, data) => {
    setSelectedCategories(data.value.map(val => {
      return {
        id: val
      }
    }));
  }

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
      <form onSubmit={onSubmit} className="content-form">
        <Finput className="movie-input" placeholder="Name *" required/>
        <Finput className="movie-input" placeholder="Description *" required/>
        <Finput className="movie-input" placeholder="Director *" required/>
        <Finput type="date" className="movie-input" placeholder="Release date *" required/>
        <Finput className="movie-input" placeholder="Budget *" required/>
        <div className="movie-input">
          <label htmlFor="image-input">Thumbnail</label>
          <input className="movie-input" id="image-input" type="file" accept="image/*" required/>
        </div>
        <div className="movie-input movie-categories">
          <Dropdown multiple selection placeholder="Select category" options={categories} onChange={onCategoryDropdownChange}/>
        </div>

        <FButton type="submit" className="movie-input movie-button">Add Movie</FButton>
      </form>
      
    </>
  );
};


export default AddMovie;