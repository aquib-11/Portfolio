import { Form, useSubmit } from "react-router-dom";
import styled from "styled-components";

const Search = ({ types,name, desc:{heading, para} }) => {
  const submit = useSubmit();

  return (
    <Head>
      <div className="head">
        <h1>{heading}</h1>
        <p>{para}</p>
      </div>
      <Form className="searchBar">
        <input
          name="search"
          className="formInput"
          placeholder="search"
          type="text"
          onChange={(e) => {
            submit(e.currentTarget.form);
          }}
        />
        <select
          onChange={(e) => {
            submit(e.currentTarget.form);
          }}
          name={name}
          className="formInput"
        >
          {types.includes("Frontend") && <option>all</option>}
          {types.map((item) => {
            return (
              <option key={item} value={item}>
                {item}
              </option>
            );
          })}
        </select>
      </Form>
    </Head>
  );
};
export default Search;
const Head = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1rem 1rem 2rem;
  .searchBar {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }
  select {
    color: var(--sec-color);
  }
  @media only screen and (max-width: 600px) {
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 1rem ;
    padding:0;
    .head{text-align:center}
    .searchBar {
      display: grid;
      gap: 0.5rem;
    }
.formInput{
  width: 230px;
}
  }
`;
