import { Form, redirect, useNavigation } from "react-router-dom";
import Wrapper from "../../assets/wrapper/about";
import FormRow, {
  FormImageRow,
} from "../../components/formRow";
import customFetch from "../../utils/customFetch";
import { toast } from "react-toastify";

export const AddTechAction = async ({ request }) => {
  const formData = await request.formData();
  try {
    await customFetch.post("/techstacks", formData);
    toast.success("techstack created");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
  return null;
};

const AddTech = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <Wrapper>
      <Form method="post" encType="multipart/form-data">
        <h4 className="formHeading">Add Teckstack</h4>
        <div className="reactForm changeForm">
          <FormImageRow name="avatar" labelText="image" />
          <FormRow type="text" name="type" labelText="category" />
          <FormRow type="text" name="title" labelText="title" />
          <FormRow type="text" name="language" labelText="type" />
          <FormRow type="text" name="address" labelText="address" />
          <button type="submit" className="formBtn" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};
export default AddTech;
