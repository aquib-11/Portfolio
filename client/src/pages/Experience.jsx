import { toast } from "react-toastify";
import Wrapper from "../assets/wrapper/about";
import customFetch from "../utils/customFetch";
import { Form, Link, useLoaderData, useOutletContext } from "react-router-dom";
import styled from "styled-components";

import { FaRegEye } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";

export const ExperienceLoader = async () => {
  try {
    const { data } = await customFetch.get("/expriences");
    return { data };
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const Experience = () => {
  const { data } = useLoaderData();
  const { exprience: expriences } = data;
  const { userRole } = useOutletContext();
  return (
    <Wrapper>
      <div className="head">
        <h1>Experience</h1>
        <p>Proficient hands, ignited by steadfast passion.</p>
      </div>
      <Div>
        {expriences.map((exprience) => {
          const {
            _id,
            post,
            company,
            address,
            location,
            desc,
            startDate,
            endDate,
          } = exprience;
          const listItem = desc
            .toString()
            .split("##")
            .map((tech) => tech.trim());
          return (
            <div key={_id} className="card">
              <div className="details">
                <h4>{post}</h4>
                <p>
                  <span>Company : </span>
                  {company}
                </p>
                <p>
                  <span>Location : </span>
                  {location}
                </p>
                <p>
                  <span>Start-Date : </span>
                  {startDate}
                </p>
                <p>
                  <span>End-Date : </span>
                  {endDate}
                </p>
              </div>
              <div className="desc">
                <h3>What i Did</h3>
                {listItem.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </div>
              {userRole === "admin" && (
                <div className="actions">
                  <Link
                    to={`/edit-experience/${_id}`}
                    className="btn updateBtn"
                  >
                    <FaRegEye />
                  </Link>
                  <Form method="post" action={`/delete-experience/${_id}`}>
                    <button type="submit" className="btn deleteBtn">
                      <AiFillDelete />
                    </button>
                  </Form>
                </div>
              )}
            </div>
          );
        })}
      </Div>
    </Wrapper>
  );
};
const Div = styled.div`
  display: grid;
  padding: 1rem;
  gap: 2rem;
  .card {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 1rem;
    padding: 2rem;
    border-radius: 20px;
    border:1px solid var(--border-1);
    position: relative;
  }
  .details {
    display: grid;
  }
  h4,h3 {
    font-size: 1.4rem;
  }
  h3 {
    margin-bottom: 1rem;
  }
  li {
    list-style: disc;
    margin-bottom: 0.5rem;
    color: var(--sec-color);
  }
  .actions {
    position: absolute;
    top: 1rem;
    right: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }
  .btn {
    background-color: transparent;
    border: none;
    color: var(--color);
    font-size: 1.5rem;
    transition: 0.3s;
    cursor: pointer;
  }
  .updateBtn:hover {
    color: goldenrod;
  }
  .deleteBtn:hover {
    color: red;
  }
    @media only screen and (max-width: 600px) {
  padding: 0;
  gap: 1rem;
  .card {
    grid-template-columns: 1fr ;
    padding: 1rem;
    border-radius: 10px;
  }
}
`;
export default Experience;
