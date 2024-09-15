import styled from "styled-components";
import background from "../images/background-hex.jpg"
const Header = styled.header`
  background-color: var(--bg-color);
  /*   
  background-image: url(${background});
   background-size: cover; 
  background-position: center;  */
  padding: 1rem 2rem;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 1rem 0;
  .img-container {
    width: 90px;
    height: 90px;
    border: 5px solid var(--dark-bg-color);
    border-radius: 50%;
    overflow: hidden;
  }
  .profile {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }
  .img-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .bio {
    color: var(--color);
    display: flex;
    flex-direction: column;
  }

  .bio h1 {
    font-size: 1.7rem;
    margin-bottom: 0.4rem;
  }

  .bio span {
    color: var(--sec-color);
    font-size: 1rem;
  }

  .name {
    display: flex;
    align-items: center;
    justify-content: start;
    gap: 0.5rem;
  }

  .name span {
    font-size: 1.35rem;
    color: var(--color);
    cursor: pointer;
  }

  .social-icons {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.7rem;
  }

  .social-icons a,
  .social-icons button,
  .social-icons span {
    font-size: 1.3rem;
    background-color: var(--dark-bg-color);
    box-shadow: var(--inner-shadow);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.6rem;
    border-radius: 50px;
    color: var(--sec-color);
    cursor: pointer;
    border: none;
    transition: 0.3s;
  }

  .social-icons a:hover,
  .logOut:hover,
  .toggleTheme:hover,
  .social-icons span:hover {
    color: var(--color);
    border-radius: 10px;
  }

  @media only screen and (max-width: 600px) {
    padding: 1rem;
    flex-direction: column;
    gap: 1rem;
  }
  .bio h1 {
    font-size: 1.4rem;
    margin-bottom: 0.4rem;
  }
`;

export default Header;
