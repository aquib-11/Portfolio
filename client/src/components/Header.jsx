
import Wrapper from "../assets/wrapper/Header";
import {
  FaWhatsapp,
  FaLinkedinIn,
  FaGithub,
} from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { FaSkyatlas } from "react-icons/fa";
import { MdOutlineDarkMode } from "react-icons/md";
import { useHomelayoutContext } from "../pages/HomeLayout";
import { HiOutlineLogout } from "react-icons/hi";
import { Form, Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "react-toastify";

const Header = () => {

  const {
    theme,
    toggleTheme,
    user,
    adminDetails: {
      _id,
      name,
      GithubUrl,
      LinkedUrl,
      whatappUrl,
      phone,
      location,
      email,
      birthday,
      headline,
      avatar
    },
  } = useHomelayoutContext();
 const { isAuthenticated, user:authUser, logout } = useAuth0();
 const isUser = isAuthenticated && authUser;
 
 const logOutMessage = ()=>{
              toast.success("logged out")
 }
    
  return (
    <Wrapper>
      <div className="profile">
        <div className="img-container">
          <img src={avatar} alt="profile"></img>
        </div>
        <div className=" bio">
          <div className="name">
            <h1>{name}</h1>
            {user.userRole === "admin" && (
              <span>
                <Link to={`update-details/${_id}`}>
                  <CiEdit />
                </Link>
              </span>
            )}
          </div>
          <span>{headline}</span>
        </div>
      </div>

      <div className="social-icons">
        <a href={GithubUrl}>
          <FaGithub />
        </a>
        <a href={LinkedUrl}>
          <FaLinkedinIn />
        </a>
        <a href={whatappUrl} target="_blank">
          <FaWhatsapp />
        </a>
        <span onClick={toggleTheme} className="toggleTheme">
          {theme ? <FaSkyatlas /> : <MdOutlineDarkMode />}
        </span>
        {user.userRole === "admin" && (
          <Form method="post" action={`/logout`}>
            <button>
              <HiOutlineLogout />
            </button>
          </Form>
        )}
        {isUser && (
          <button
            onClick={() => {
              logout({
                logoutParams: { returnTo: window.location.origin },
              });
              logOutMessage();
            }}
          >
            <HiOutlineLogout />
          </button>
        )}
      </div>
    </Wrapper>
  );
};
export default Header;
