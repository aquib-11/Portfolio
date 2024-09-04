import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import Links from "../utils/Links";
import styled from "styled-components";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoCloseOutline } from "react-icons/io5";

const MobileNav = ({ user }) => {
  const [isVisible, setIsVisible] = useState(false);
  const navRef = useRef();
  const ulRef = useRef();

  const handleClickOutside = (event) => {
    if (navRef.current && !navRef.current.contains(event.target)) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const links = Links.filter((link) => link.path !== "adminthings");
  const privateLink = Links.find((link) => link.path === "adminthings");

  return (
    <Wrapper ref={navRef} user={user} isVisible={isVisible}>
      <ul ref={ulRef}>
        {isVisible && (
          <>
            <div className="spacer"></div>
            {links.map((link) => {
              const { text, path, icon } = link;
              return (
                <li
                  key={text}
                  onClick={() => {
                    setIsVisible(!isVisible);
                  }}
                >
                  <NavLink to={path} end>
                    <span className="icon">{icon}</span>
                    <span className="text">{text}</span>
                  </NavLink>
                </li>
              );
            })}
            {user.userRole === "admin" && (
              <li
                onClick={() => {
                  setIsVisible(!isVisible);
                }}
                key={privateLink.text}
              >
                <NavLink to={privateLink.path} end>
                  <span className="icon">{privateLink.icon}</span>
                  <span className="text">{privateLink.text}</span>
                </NavLink>
              </li>
            )}
          </>
        )}

        <span
          className="navHam"
          onClick={() => {
            setIsVisible(!isVisible);
          }}
        >
          {isVisible ? <IoCloseOutline /> : <RxHamburgerMenu />}
        </span>
      </ul>
    </Wrapper>
  );
};

const Wrapper = styled.nav`
  position: fixed;
  bottom: 1rem;
  background-color: var(--dark-bg-color);
  box-shadow: var(--inner-shadow);
  width: ${({ isVisible }) => (isVisible ? "90vw" : "70px")};
  left: 5vw;
  right: auto;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  color: #fff;
  transition: 0.5s ease-in-out;

  ul {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding: ${({ isVisible }) => (isVisible ? "0 2rem" : "auto")};
    overflow-x: scroll;
  }

  .spacer {
    min-width: ${({ user }) => (user.userRole === "admin" ? "26rem" : "21rem")};
  }

  li {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 0.5rem;
    padding: 0 1rem;
    white-space: nowrap;
    position: relative;
  }

  a {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-decoration: none;
    color: inherit;
  }

  .icon {
    font-size: 1.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.5s;
    position: relative;
    z-index: 9999;
    padding: 0.5rem;
    border-radius: 50px;
  }

  .text {
    font-size: 0.75rem;
    margin-top: 0.5rem;
    position: absolute;
    display: none;
  }

  .active {
    background-color: transparent;
  }
  li .active .icon {
    transform: translatey(-10px);
    background-color: var(--hover);
    font-size: 1.5rem;
  }
  li .active .text {
    display: block;
    transform: translateY(1rem);
  }
  .navHam {
    color: var(--color);
    font-size: ${({ isVisible }) => (isVisible ? "1.7rem" : "2rem")};
    display: grid;
    padding: 0.6rem;
    color: var(--sec-color);
    background-color: var(--dark-bg-color);
    box-shadow: ${({ isVisible }) =>
      isVisible ? "var(--inner-shadow)" : "none"};
    display: grid;
    align-items: center;
    cursor: pointer;
    border-radius: 10px;
    transition: all 0.3s;
  }
    @media only screen and (min-width: 600px) {
display: none;
     }
`;

export default MobileNav;
