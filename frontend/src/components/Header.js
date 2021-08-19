import { useRef, useState } from "react";
import { FaSearch, FaUser } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { RiAdminLine } from "react-icons/ri";
import { Link, Redirect } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import useScreenWidth from "../hooks/useScreenWidth";
import Finput from "../styled_components/Finput";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../redux_slices/authSlice";
import { useEffect } from "react";


const Header = ({ onSearch }) => {
  const [screenWidth] = useScreenWidth();
  const [isSearching, setIsSearching] = useState(false);
  const [searchText, setSearchText] = useState('');
  const searchInputRef = useRef(null);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const user = useSelector(state => state.auth.user);

  useEffect(() => {
    if(onSearch){
      onSearch(searchText);
    }
  }, [searchText]);

  const onSearchInputChange = (e) => {
    const { data, inputType } = e.nativeEvent;
    if(inputType === "deleteContentBackward"){
      if(searchText.length > 0){
        setSearchText(searchText.slice(0,searchText.length - 1));
      }
    }else if(inputType === "insertText"){
      setSearchText(searchText + data);
    }
  };

  const onSearchIcon = () => {
    setIsSearching(true);
  };

  const onSearchFocusLost = () => {
    setIsSearching(false);
  };

  const onCloseSearch = () => {
    setIsSearching(false);
    setSearchText('');
  };

  const onLogOut = () => {
    dispatch(logOut());
  }
  
  if(!isLoggedIn){
    return <Redirect to='/login' />;
  }

  return (
    <BaseHeader>
      <ul className={`nav-links ${screenWidth < 768 && isSearching ? 'gone' : ''}`}>
        <li>
          <Link to='/' className="link logo">MOVIERATION</Link>
        </li>
        <li className="nav-link">
          <Link to="/Mood" className="link">Mood</Link>
        </li>
        <li className="nav-link">
          <Link to="/populer" className="link">Populer</Link>
        </li>
      </ul>
      <div className={`search ${screenWidth < 768 && !isSearching ? 'gone' : ''}`}>
        <Finput value={searchText} onChange={onSearchInputChange} ref={searchInputRef} onBlur={onSearchFocusLost} onClick={onSearchIcon} className={`search-input`} radius="10px" placeholder="Search" />
        <IoClose onClick={onCloseSearch} className="close-icon" size={24} />
      </div>
      <div className={`right ${screenWidth < 768 && isSearching ? 'gone' : ''}`}>
        <div className={`search-icon ${screenWidth > 768 ? 'gone' : ''}`} onClick={onSearchIcon}>
          <FaSearch size={24} />
        </div>
        {
          user.role === "ADMIN" ? 
            <Link to="/secure-admin" className="link">
              <RiAdminLine size={24} />
            </Link>
          :
          null
        }
   
        <Link to="/UserProfile" className="link">
          <FaUser size={24} />
        </Link>
        <span onClick={onLogOut} className="link">
          <FiLogOut size={24} />
        </span>
      </div>
    </BaseHeader>
  );
};

const BaseHeader = styled.div`
  position: relative;
  height: 8%;
  background-color: var(--primarylight-color);
  display: flex;
  align-items: center;
  color: white;
  box-shadow: 0px 3px black;
  z-index: 50;
  .nav-links{
    display: flex;
    flex: 1;
    align-items: center;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .logo {
    font-size: 3vh !important;
    font-weight: bold;
    text-shadow: 2px 2px 2px black;
    padding: 0px 10px;
    color: var(--unique-text) !important;
  }

  .link {
    color: white;
    text-decoration: none;
    font-size: 2vh;
    padding: 0px 20px;
    transition: color 0.5s;
    &:hover {
      cursor: pointer;
      color: #B1D4E0;
    }
  }

      .search {
        position: relative;
      flex:1;
      display: flex;
      justify-content:center;
      align-items: center;
      transition: opacity .5s;
      max-width: 400px;

      .close-icon {
        position: absolute;
      margin-right: 10px;
      right: 0;
    }
  }

  .right {
    padding-right: 12px;
    display: flex;
    justify-content: flex-end;
    flex: 1;
    & > * {
        /* every child */
        padding: 0px 10px;
    }
  }

  .gone {
    display: none;
    opacity: 0;
  }

@media only screen and (max-width: 1024px) {
    /* tablets */
  .nav-link {
    display: none;
  }

  .search {
    flex: auto;
  }
}


  @media only screen and (max-width: 768px) {
    /* mobile */
    .search {
      height: 100%;
      margin: 4px 10px;
      max-width: unset;
    }
  }

`;


export default Header;