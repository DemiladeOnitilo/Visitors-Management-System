import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth" // Remove this if you prefer an instant snap to the top
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;