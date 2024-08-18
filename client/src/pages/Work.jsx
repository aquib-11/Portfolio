import { toast } from "react-toastify";
import Wrapper from "../assets/wrapper/about";
import customFetch from "../utils/customFetch";
import { Form, Link, useLoaderData, useOutletContext } from "react-router-dom";
import styled from "styled-components";
import { PROJECT_TYPE } from "../../../utils/contants";

import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import PageBtnContainer from "../components/PageBtnContainer";
import Search from "../components/Search";
day.extend(advancedFormat);

export const WorkLoader = async ({request}) => {
  const params = Object.fromEntries([...new URL(request.url).searchParams.entries()])
  try {
    const { data } = await customFetch.get("/projects",{
      params,
    });
    return { data };
  } catch (error) {
    toast.error(error?.response?.data?.msg);  
    return error;
  }
};
const Work = () => {
  const { data } = useLoaderData();
  const { projects, numOfPages, } = data;
  const { userRole } = useOutletContext();
    const types = Object.values(PROJECT_TYPE);

  return (
    <Wrapper>
      <Search
        desc={{
          heading: "Work",
          para: "Creating innovative projects with passion.",
        }}
        types={types}
        name="projectType"
      />
      <Div projects={projects}>
        {projects.length > 0 ? (
          projects.map((project) => {
            const { _id, title, projectType, avatar, address, createdAt } =
              project;
            const date = day(createdAt).format("MMM DD YYYY");
            return (
              <div className="card" key={_id}>
                <Link to={`/single-project/${_id}`} className="imageLink">
                  <img src={avatar} />
                </Link>
                <div className="head">
                  <h6>{projectType}</h6>
                  <span>{date}</span>
                </div>
                <Link to={`/single-project/${_id}`}>
                  <h4>{title}</h4>
                </Link>
                {userRole === "admin" && (
                  <div className="actions">
                    <Link to={`/edit-project/${_id}`} className="btn editBtn">
                      Edit
                    </Link>
                    <Form method="post" action={`/delete-project/${_id}`}>
                      <button type="submit" className="btn deleteBtn">
                        Delete
                      </button>
                    </Form>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <p>No projects found. Try adjusting your search or filters</p>
        )}
      </Div>
      {numOfPages > 1 && <PageBtnContainer data={data} />}
    </Wrapper>
  );
}


const Div = styled.div`
  padding: 1rem;
  display: grid;
  grid-template-columns: ${({ projects }) => (projects.length > 0 ?  "repeat(3, 1fr)": "1fr")};
  gap: 2rem;
  .card {
    box-shadow: var(--shadow-1);
    border-radius: 20px;
    padding: 2rem;
    display: grid;
    gap: 1rem;
    transition: 0.3s;
  }
  img {
    width: 100%;
    object-fit: cover;
    transition: 0.4s;
  }
  .head {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  span {
    color: var(--sec-color);
  }
  h6 {
    font-size: 1rem;
    color: var(--hover);
    font-weight: 400;
  }
  h4 {
    font-size: 1.2rem;
    transition: 0.3s;
  }
  h4:hover {
    color: var(--hover);
  }
  .imageLink {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    height: 200px;
    overflow: hidden;
  }
  .actions {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
  }
  .btn {
    background: transparent;
    color: var(--color);
    box-shadow: var(--inner-shadow);
    font-size: 1.1rem;
    font-weight: 400;
    padding: 0.5rem 2rem;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    transition: 0.3s;
  }
  .deleteBtn:hover {
    color: red;
  }
  .editBtn:hover {
    color: goldenrod;
  }
  .card:hover {
    background-color: var(--dark-bg-color);
    /* box-shadow: var(--inner-shadow); */
    box-shadow: var(--shadow-2);
  }
  img:hover {
    scale: 1.1;
  }
  p{
    font-size: 1.1rem;
    text-align: center;
    margin-top: 2rem;
  }
  @media only screen and (max-width: 600px) {
    padding: 0;
    grid-template-columns: 1fr;
    gap: 1rem;
    .card {
      border-radius: 10px;
      padding: 1.4rem;
    }
  }
`;
export default Work;
