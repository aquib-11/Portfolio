import { Form, useNavigation } from "react-router-dom";
import Wrapper from "../../assets/wrapper/about";
import FormRow, { FormTextareaRow } from "../../components/formRow";
import customFetch from "../../utils/customFetch";
import { toast } from "react-toastify";

export const AddExprienceAction = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData)
  try {
    await customFetch.post("/expriences", data);
    toast.success("exprience created");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
  return null;
};

const AddExprience = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <Wrapper>
      <Form method="post">
        <h4 className="formHeading">Add Exprience</h4>
        <div className="reactForm changeForm">
          <FormRow
            type="text"
            name="post"
            labelText="post"
          />
          <FormRow
            type="text"
            name="company"
            labelText="company"
          />
          <FormRow
            type="text"
            name="location"
            labelText="location"
          />
          <FormRow
            type="text"
            name="address"
            labelText="address"
         />
          <FormRow
            type="text"
            name="startDate"
            labelText="start-Date"
          />
          <FormRow
            type="text"
            name="endDate"
            labelText="end-Date"
          />
          <FormTextareaRow
            name="desc"
            labelText="description ( use ## to make li)"
          />
          <button type="submit" className="formBtn" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};
export default AddExprience;
