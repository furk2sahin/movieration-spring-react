import { useEffect, useState } from "react";

const useScreenWidth = () => {

  const [screenWidth, setscreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setscreenWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);


    return _ => {
      window.removeEventListener('resize', handleResize);
    }
  }, []);

  return [screenWidth, screenWidth < 985];
}

export default useScreenWidth;