import styled from "styled-components";

const Wrapper = styled.div`
  background-color: var(--dark-bg-color);
  padding: 0 4rem;
  @media only screen and (max-width: 600px) {
    padding: 0 .8rem;
  }
`;
export default Wrapper


export const AdminOutlet = styled.div`
  background-color: var(--bg-color);
  color: var(--color);
  padding: 1rem;
  border-radius: 15px;
  position: relative;
  @media only screen and (max-width: 600px) {
    padding: 1rem 0 0 0 ;
  }
`;
;