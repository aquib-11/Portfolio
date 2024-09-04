import { NavLink, Outlet } from "react-router-dom"
import { addThingsList } from "../../utils/Links" 
import styled from "styled-components"
import { AdminOutlet } from "../../assets/wrapper/HomeLayout"


const AdminThings = () => {

  return (
    <AdminOutlet>
      <Div>
        {addThingsList.map((link) => {
          const { text, path } = link;
          return (
            <NavLink to={path} key={text} end>
              {text}
            </NavLink>
          );
        })}
      </Div>
      <Outlet />
    </AdminOutlet>
  );
}
export default AdminThings;
const Div = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  background-color: var(--bg-color);
  box-shadow: var(--inner-shadow);
  border-radius: 50px;
  padding: 1rem;
  a {
    padding: 1rem;
    border-radius: 10px;
    transition: all.3s;
  }
  a:hover {
    background-color: var(--hover);
  }
  @media only screen and (max-width: 600px) {
    width: 80vw;
    overflow-x: scroll;
    gap: 1rem;
    font-size: 0.8rem;
    border-radius: 15px;
    margin-left:5% ;
  }
`;

