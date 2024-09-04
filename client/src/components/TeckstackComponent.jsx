import { Form, Link, useLocation } from "react-router-dom";
import styled from "styled-components";

const TeckstackComponent = ({ stacks, userRole }) => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
  const selectedType = queryParams.get("type") || "Skills";
  return (
    <>
      <Wrapper>
        {stacks.map((stack) => {
          const { _id, avatar, address, language, title, type } = stack;
          return (
            <div className={`card ${type} `} key={_id}>
              <a href={address} target="_blank">
                <img src={avatar} />
                <div className="details">
                  <span>{title}</span>
                  <span>{language}</span>
                </div>
              </a>
              {userRole === "admin" && (
                <div className="actions">
                  <div>
                    <Link to={`/edit-tech/${_id}`} className="btn editBtn">
                      Edit
                    </Link>
                  </div>
                  <Form method="post" action={`/delete-tech/${_id}`}>
                    <button type="submit" className="btn deleteBtn">
                      Delete
                    </button>
                  </Form>
                </div>
              )}
            </div>
          );
        })}
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 2rem;
  flex-wrap: wrap;
  margin: 2rem 0;
  .card {
    position: relative;
    background-color: var(--background-color-1);
    box-shadow: var(--shadow-1);
    border-radius: 20px;
    width: 300px;
    height: 300px;
    overflow: hidden;
    transition: 0.4s;
  }
  a {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
  }
  img {
    width: 100px;
    background-color: transparent;
    transition: 0.4s;
  }
  .details {
    position: absolute;
    width: 100%;
    padding: 0 1rem;
    bottom: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }npm
  .details span:last-child {
    box-shadow: var(--inner-shadow);
    padding: 7px 10px;
    border-radius: 50px;
    color: var(--sec-color);
  }
  .details span {
    color: var(--color);
    padding: 5px 10px;
    border-radius: 50px;
  }
  .actions {
    position: absolute;
    top: 1rem;
    left: 0;
    padding: 0 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }
  .btn {
    display: inline-block;
    background-color: transparent;
    border: none;
    color: var(--color);
    box-shadow: var(--inner-shadow);
    padding: 7px 20px;
    border-radius: 10px;
    cursor: pointer;
    font-size: 1.1rem;
    transition: 0.3s;
  }
  .deleteBtn:hover {
    color: red;
  }
  .editBtn:hover {
    color: goldenrod;
  }
  .card > a:hover {
    /* box-shadow: var(--inner-shadow); */
    box-shadow: var(--shadow-2);
  }
  .card:hover img {
    scale: 1.2;
  }
  .Games img {
    width: 200px;
  }
  .Dev img {
    width: 130px;
  }
`;
export default TeckstackComponent;
