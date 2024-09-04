import styled from "styled-components";

const Wrapper = styled.nav`
  background-color: var(--bg-color);
  width: 200px;
  border-radius: 15px;
  padding: 1.5rem;
  color: var(--color);
  height: max-content;
  position: sticky;
  top: 2rem;

  a {
    padding: 1.2rem 0 1.2rem 0.5rem;
    margin-bottom: 0.5rem;
    border-radius: 10px;
    display: flex;
    align-items: center;
    transition: background-color 0.4s;
  }
  span {
    display: flex;
    align-items: center;
    margin-right: 0.4rem;
  }
  a:hover {
    background-color: var(--hover);
  }
  @media only screen and (max-width: 600px) {
   display: none;
  }
`;
export default Wrapper