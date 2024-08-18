import { useState } from "react";
import { FaToggleOn } from "react-icons/fa";
import { FaToggleOff } from "react-icons/fa6";

const ChangeFormComponent = () => {
  const [formStyle, setFormStyle] = useState(true);

return (
  <span className="formStyle" onClick={() => setFormStyle((prev) => !prev)}>
    {formStyle ? <FaToggleOn /> : <FaToggleOff />}
  </span>
);
};
export default ChangeFormComponent;
