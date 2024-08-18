import { Form, redirect, useNavigation } from "react-router-dom";
import Wrapper from "../../assets/wrapper/about";
import FormRow, {
  FormImageRow,
  FormSelectRow,
  FormTextareaRow,
} from "../../components/formRow";
import customFetch from "../../utils/customFetch";
import { toast } from "react-toastify";
import { PROJECT_TYPE } from "../../../../utils/contants";
import { useState } from "react";
import { FaToggleOff, FaToggleOn } from "react-icons/fa";

export const thingsAction = async ({ request }) => {
  const formData = await request.formData();
  try {
    await customFetch.post("/projects", formData);
    toast.success("project created");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
  return null;
};

const AddThings = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const [formStyle, setFormStyle] = useState(true);
  return (
    <Wrapper>
      <Form method="post" encType="multipart/form-data">
        <h4 className="formHeading">Add Project</h4>
        <div className={`reactForm ${!formStyle && "changeForm"}`}>
          <FormImageRow name="avatar" labelText="image" />
          <FormRow type="text" name="title" labelText="title" />
          <FormRow type="text" name="address" labelText="address" />
          <FormRow
            type="text"
            name="technologyUsed"
            labelText="technologyUsed"
          />
          <FormSelectRow
            name="projectType"
            labelText="project type"
            value={PROJECT_TYPE.FRONT_END}
            list={Object.values(PROJECT_TYPE)}
          />
          {/* <FormRow type="text" name="projectType" labelText="projectType" /> */}
          <FormTextareaRow name="desc" labelText="description" />
          <button type="submit" className="formBtn" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
          <span
            className="formStyle"
            onClick={() => setFormStyle((prev) => !prev)}
          >
            {formStyle ? <FaToggleOn /> : <FaToggleOff />}
          </span>
        </div>
      </Form>
    </Wrapper>
  );
};
export default AddThings;
