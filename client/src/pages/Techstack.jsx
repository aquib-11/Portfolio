import { toast } from "react-toastify";
import Wrapper from "../assets/wrapper/about";
import customFetch from "../utils/customFetch";
import { useLoaderData, useOutletContext } from "react-router-dom";
import styled from "styled-components";
import TeckstackComponent from "../components/TeckstackComponent";
import Search from "../components/Search";
import PageBtnContainer from "../components/PageBtnContainer";

export const TechLoader = async ({request}) => {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);
  try {
    const { data } = await customFetch.get("/techstacks", { params });
    return { data };
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const Techstack = () => {
  const { data } = useLoaderData();
  const { stacks, types, numOfPages } = data;
  const { userRole } = useOutletContext();
  return (
    <Wrapper>
      <Search
        desc={{
          heading: "Techstack",
          para: "Tech tools, apps, devices, and games – shaping my digital world.",
        }}
        types={types.reverse()}
        name="type"
      />
      <DIV>
        {stacks.length > 0 ? (
          <TeckstackComponent stacks={stacks} userRole={userRole} />
        ) : (
            <p>No result found. Try adjusting your search or filters</p>
        )}
      </DIV>
      {numOfPages > 1 && <PageBtnContainer data={data} />}
    </Wrapper>
  );
};

const DIV = styled.div`
  padding: 1rem;
  h3 {
    font-size: 2rem;
    letter-spacing: 2px;
    margin-left: 1rem;
  }
  p {
    font-size: 1.1rem;
    text-align: center;
    margin-top: 2rem;
  }
  @media only screen and (max-width: 600px) {
    padding: 0;
  }
`;
export default Techstack;
