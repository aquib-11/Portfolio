import { Link, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../../utils/customFetch";
import styled from "styled-components";
import { FaBackspace } from "react-icons/fa";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
day.extend(advancedFormat);

export const SingleProjectLoader = async ({ params }) => {
  try {
    const { data } = await customFetch.get(`/projects/${params.id}`);
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};
// const userloader = async ({params})=>{
//  const id = params.id
//  user
//  return {user}
// }

const SingleProject = () => {
  const { project } = useLoaderData();
  const {
    avatar,
    projectType,
    desc,
    technologyUsed,
    title,
    address,
    createdAt,
  } = project;
  const createddate = day(createdAt).format("MMM DD YYYY");
  const techUsedArray = technologyUsed
    .toString()
    .split(",")
    .map((tech) => tech.trim());
  return (
    <Wrapper>
      <div className="project">
        <img src={avatar} />
        <div className="details">
          <span className="icon">
            <Link to="/work">
              <FaBackspace />
            </Link>
          </span>
          <div className="head">
            <span className="projectype">{projectType}</span>
            <span>{createddate}</span>
          </div>
          <h4>{title}</h4>
          <p>{desc}</p>
          <div className="tech">
            <h5>Technology used :</h5>
            <ul>
              {techUsedArray.map((tech) => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>
          </div>
          <div className="btnContainer">
            <a href={address} className="viewProject" target="_blank">
              View Project
            </a>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.main`
  background-color: var(--bg-color);
  width: 100%;
  height: 100vh;
  display: grid;
  place-items: center;
  padding: 0 5rem;
  .project {
    padding: 3rem;
    gap: 3rem;
    box-shadow: var(--shadow-1);
    background-color: var(--dark-bg-color);
    display: flex;
    border-radius: 20px;
    position: relative;
    height: max-content;
  }
  img {
    width: 40%;
    height: 400px;
    object-fit: cover;
    border-radius: 20px;
  }
  .details {
    display: grid;
    gap: 1rem;
    color: var(--sec-color);
  }
  .icon {
    position: absolute;
    font-size: 2.5rem;
    top: 1rem;
    right: 1rem;
    color: var(--hover);
    transition: 0.3s;
  }
  .head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 4rem;
    margin-top: 1rem;
    font-size: 1.2rem;
  }
  .projectype {
    color: var(--hover);
  }
  h4 {
    font-size: 1.6rem;
  }
  p {
    font-size: 1.1rem;
    text-align: justify;
  }
  .tech {
    font-size: 1.3rem;
    display: flex;
    align-items: center;
    gap: 3rem;
  }
  ul {
    display: flex;
    align-items: center;
    gap: 1.7rem;
    font-size: 1rem;
    flex-wrap: wrap-reverse;
  }
  li {
    box-shadow: var(--shadow-2);
    padding: 10px;
    border-radius: 10px;
  }
  .viewProject {
    padding: 10px 20px;
    font-size: 1.4rem;
    box-shadow: var(--inner-shadow);
    display: inline-block;
    color: var(--hover);
    border-radius: 20px;
    transition: 0.3s;
  }
  .viewProject:hover,
  .icon:hover {
    color: green;
  }
  @media only screen and (max-width: 600px) {
    padding: 1rem;
    height: auto;
    .project {
      padding: 1rem;
      gap: 1rem;
      flex-direction: column;
    }
    img {
      width: 100%;
      height:250px;
      border-radius: 10px;
    }
    .details {
      gap: .7rem;
    }
    .icon {
      right: 2rem;
    }
    .head {
     padding-right: 0;
    }
    .tech {
      flex-direction: column;
      align-items: start;
      gap: 1rem;
    }
    ul {
      gap: 1rem;
      flex-wrap: wrap;
    }
    .viewProject {
      border-radius: 20px;
      transition: 0.3s;
      margin-top: 1rem;   
    }
    .btnContainer{
      text-align: center;
    }
  }
`;
export default SingleProject;
