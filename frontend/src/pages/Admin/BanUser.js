import { useRef } from "react";
import { useState } from "react";
import FButton from "../../styled_components/FButton";
import Finput from "../../styled_components/Finput";
import {banUserByUsername, unBanUserByUsername} from "../../requests";
const BanUser = ({title}) => {
  const [ info, setInfo ] = useState("");
  const banInputRef = useRef();
  const unBanInputRef = useRef();

  const onBanUserClicked = async () => {
    const username = banInputRef.current.value;
    if(!username) return alert("Give me a username");
    
    const response = await banUserByUsername(username)
    if(response?.status === 200){
      setInfo(response.data);
    }else{
      setInfo("Error please try again later!");
    }
  };
  
  const onUnBanUserClicked = async () => {
    const username = unBanInputRef.current.value;
    if(!username) return alert("Give me a username");

    const response = await unBanUserByUsername(username)

    if(response?.status === 200){
      setInfo(response.data);
    }else{
      setInfo("Error please try again later!");
    }
  };

  return (
    <>
      <div className="content-title">
        {title}
      </div>
      {
        info !== "" ?   
        <div className="content-info">
          {info}
        </div> : null
      }

      <form className="content-form">
        <Finput className="movie-input" ref={banInputRef} className="movie-input" placeholder="Username"/>
        <FButton type="button" height="40px" onClick={onBanUserClicked} className="movie-input">Ban User</FButton>
        <Finput className="movie-input" ref={unBanInputRef} className="movie-input" placeholder="Username"/>
        <FButton type="button" height="40px" onClick={onUnBanUserClicked} className="movie-input">Unban User</FButton>
      </form>
    </>
  );
};

export default BanUser;