import { useLocation, useNavigate,  } from "react-router-dom";
import styled from "styled-components";
import { GrFormPreviousLink, GrFormNextLink } from "react-icons/gr";



const PageBtnContainer = ({ data: { currentPage, numOfPages } }) => {
  const pages = Array.from({length: numOfPages},
     (_, index)=>{return index + 1}
    )
    const { search, pathname } = useLocation();
    const navigate = useNavigate();

   const handlePageChange = (page)=>{
   const searchParams = new URLSearchParams(search)
   searchParams.set("page",page)
   navigate(`${pathname}?${searchParams.toString()}`)
   }
  return (
    <Wrapper>
      <button className="prevBtn"
      onClick={()=>{
         let prevPage = currentPage - 1;
         if(prevPage < 1){prevPage = numOfPages}
         handlePageChange(prevPage)
       }
      }
      ><GrFormPreviousLink/> prev</button>
      <div className="btnContainer">
        {pages.map((pageNum) => {
        return  <button key={pageNum}
                onClick={()=>{handlePageChange(pageNum)}}
                 className={`btn ${pageNum === currentPage && "active"}`}>
                 {pageNum}
                </button>;
        })}
      </div>
      <button className="prevBtn"
      onClick={()=>{
        let nextPage = currentPage + 1
        if(nextPage > numOfPages){nextPage = 1}
        handlePageChange(nextPage)
      }}
      >next <GrFormNextLink/></button>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  padding: 1rem;
  button,
  div {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  div {
    gap: 0.5rem;
  }
  button {
    box-shadow: var(--inner-shadow);
    color: var(--sec-color);
    background-color: transparent;
    border: none;
    font-size: 1rem;
    padding: 0.5rem;
    border-radius: 10px;
    transition: 0.5s;
    cursor: pointer;
  }
  .btn {
    width: 35px;
  }
  .active,
  button:hover {
    color: var(--hover);
  }
  @media only screen and (max-width: 600px) {
    gap: 0.5rem;
    padding: 1rem 0;
    button {
      font-size: 0.9rem;
      border-radius: 10px;
    }
    .btn {
      width: 35px;
    }
    .active {
      color: var(--hover);
      border-radius: 50px;
    }
  }
`;
export default PageBtnContainer