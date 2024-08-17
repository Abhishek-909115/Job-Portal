import React, { useContext } from "react";
import { Context } from "../../main";
import { Link } from "react-router-dom";
import { FaFacebookF } from "react-icons/fa";


const Footer = () => {
  const { isAuthorized } = useContext(Context);
  return (
    <footer className={isAuthorized ? "footerShow" : "footerHide"}>
      <div>&copy; All Rights Reserved By Abhishek.</div>
      <div>
        <Link to={"https://www.facebook.com/sintu.kumar.52090008"} target="_blank">
          <FaFacebookF />
        </Link>
        
        
       
      </div>
    </footer>
  );
};

export default Footer;