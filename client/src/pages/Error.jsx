import { Link, useRouteError } from "react-router-dom";
import Wrapper from "../assets/wrapper/Error";
import img from "../assets/images/notFound.svg";
const Error = () => {
  const error = useRouteError()
  if (error.status === 404){
   return (
     <Wrapper>
       <img src={img} alt="not found" />
       <h1>Ohh! page not found</h1>
       <p>We can't seem to find the page you are looking for...</p>
       <Link to="/">Back Home</Link>
     </Wrapper>
   );
  }
  return (
    <Wrapper>
      
      <h1>Something went wrong</h1>
      <Link to="/">Back Home</Link>
    </Wrapper>
  )
}
export default Error