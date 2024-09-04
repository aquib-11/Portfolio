import { NavLink } from "react-router-dom";
import Links from "../utils/Links"
import Wrapper from "../assets/wrapper/Navbar";


const Navbar = ({user}) => {
  const links = Links.filter((link)=> {
    return link.path !== "adminthings";
  } ) 
   const privateLink = Links.find((link) => {
     return link.path == "adminthings";
   }); 
  return (
    <Wrapper>
      {links.map((link) => {
        const { text, path, icon } = link;
        return (
          <NavLink to={path} key={text} end>
            <span>{icon}</span>
            {text}
          </NavLink>
          )
      })}

      {user.userRole === "admin" &&
       <NavLink to={privateLink.path} key={privateLink.text} end>
            <span>{privateLink.icon}</span>
            {privateLink.text}
          </NavLink>}
    </Wrapper>
  );
}
export default Navbar
