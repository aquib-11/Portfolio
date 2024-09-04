import styled from "styled-components";
import Wrapper from "../assets/wrapper/about";
import { useOutletContext } from "react-router-dom";
import proflie from "../assets/images/profile.jpg";
import { IoMdCheckmark } from "react-icons/io";
import { HiOutlineDocumentText } from "react-icons/hi2";
import { AiOutlineFileDone } from "react-icons/ai";
import { BsPersonFillCheck } from "react-icons/bs";
import { useHomelayoutContext } from "./HomeLayout";

const About = () => {
  const {
    adminDetails: {
      aboutMe,
      extraPoints,
      whatIdid,
      whatIdo,
      avatar1
    },
  } = useHomelayoutContext();
   const points = extraPoints
     .toString()
     .split("##")
     .map((point) => point.trim());
  return (
    <Wrapper className="main">
      <Div>
        <div className="wrapper">
          <div className="image">
            <img alt="profile" src={avatar1} />
          </div>
          <div className="about">
            <h4>See My Skills in Action & Hire Me Today</h4>
            <h1>About Me</h1>
            <p>
            {aboutMe}
            </p>
           {points.map((point)=>{
            return (
              <span key={point}>
                <IoMdCheckmark /> {point}  </span>
            );
           })}
            <a className="formBtn" target="_blank" href="https://read.cv/aquib">
              <HiOutlineDocumentText />
              <span> Resume</span>
            </a>
          </div>
        </div>
        <div className="bio">
          <div>
            <span>
              <AiOutlineFileDone />
            </span>
            <h3>What I Did</h3>
            <p>
            {whatIdid}
            </p>
          </div>
          <div>
            <span>
              <BsPersonFillCheck />
            </span>
            <h3>What I DO</h3>
            <p>
             {whatIdo}
              </p>
          </div>
        </div>
      </Div>
    </Wrapper>
  );
};
const Div = styled.div`
  .wrapper {
    display: grid;
    grid-template-columns: 2fr 3fr;
    gap: 3rem;
    padding: 1.5rem;
  }
  img {
    width: 100%;
    height: 480px;
    object-fit: cover;
    border-radius: 10px;
  }
  .about {
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: center;
    gap: 1rem;
    margin-right: 3rem;
  }
  h4 {
    color: var(--hover);
    font-size: 1.2rem;
    letter-spacing: 1px;
  }
  p {
    margin: 1rem 0;
    line-height: 1.6rem;
  }
  a {
    padding: 1rem 3rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  svg {
    font-size: 1.4rem;
  }
  span > svg {
    color: green;
    font-size: 1.7rem;
  }
  span {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  .bio {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    padding: 1.5rem;
  }
  .bio > div {
    display: grid;
    place-items: center;
    text-align: center;
    /* box-shadow: var(--shadow-1); */
    border-radius: 10px;
    border: 1px solid var(--border-1);
    padding: 1rem 2.2rem;
  }
  .bio svg {
    color: var(--color);
    font-size: 3rem;
  }
  .bio h3 {
    margin-top: 1rem;
  }
  @media only screen and (max-width: 600px) {
    .wrapper {
      grid-template-columns: 1fr;
      gap: 1rem;
      padding:0;
    }
    img {
      display: none;
    }
    p {
      margin:0;
    }
    a {
      padding: .8rem 1.4rem;
    }
    .bio {
      grid-template-columns: 1fr;
      gap: 1rem;
      padding: 1.5rem 0;
    }
  }
`;
export default About;
