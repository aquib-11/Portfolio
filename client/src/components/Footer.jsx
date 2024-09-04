import Wrapper from "../assets/wrapper/Footer"

const Footer = () => {
  const date = new Date()
  return (
    <Wrapper>
      <span>Aquib Ahmad</span>
      <span className="copyright"> &copy; {date.getFullYear()}</span>
    </Wrapper>
  );
}
export default Footer