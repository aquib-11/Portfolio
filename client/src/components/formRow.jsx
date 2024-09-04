import { useState } from "react";

import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";


const FormRow = ({ type, name, labelText, value, disable}) => {
  const [Type, setType] = useState(type);
  const showPassword = () => {
    {
      Type === "password"
        ? setType((setType) => "text")
        : setType((setType) => "password");
    }
  };

  return (
    <div className={`formRow ${name}`}>
      <label htmlFor={name} className="formLabel">
        {labelText}
      </label>
      <input
      style={{cursor:disable && "not-allowed"}}
        type={labelText === "password" ? Type : type}
        id={name}
        name={name}
        className="formInput"
        defaultValue={value || ""}
        required
        readOnly ={disable}
      />
      {type === "password" && <span className="passwordIcon" onClick={showPassword}>{Type ==="password"?<FaEyeSlash/>:<FaRegEye/>}</span>}
    </div>
  );
};
export const FormTextareaRow = ({ name, labelText, value = "" }) => {
  return (
    <div className={"formRow rowSpan"}>
      <label htmlFor={name} className="formLabel">
        {labelText}
      </label>
      <textarea
        id={name}
        name={name}
        defaultValue={value}
        className="formInput"
        rows={4}
        required
      />
    </div>
  );
};
export const FormImageRow = ({ name, labelText }) => {
  return (
    <div className="formRow ">
      <label htmlFor={name} className="formLabel">
        {labelText}
      </label>
      <input
        type="file"
        id={name}
        name={name}
        className="fileInput"
        accept="image/*"
      />
    </div>
  );
};

export const FormSelectRow = ({ name, labelText, list, value = "" }) => {
  return (
    <div className="formRow">
      <label htmlFor={name} className="formLabel">
        {labelText}
      </label>
      <select
        id={name}
        name={name}
        className="formInput"
        defaultValue={value}
        required
      >
        {list.map((item) => {
          return (
            <option key={item} value={item}>
              {item}
            </option>
          );
        })}
      </select>
    </div>
  );
};
export default FormRow;
