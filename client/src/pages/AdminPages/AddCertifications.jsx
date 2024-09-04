import { Form, useNavigation } from "react-router-dom";
import Wrapper from "../../assets/wrapper/about";
import FormRow, {
  FormImageRow,
  FormTextareaRow,
} from "../../components/formRow";
import customFetch from "../../utils/customFetch";
import { toast } from "react-toastify";


export const AddCertificationsAction = async ({ request }) => {
   const formData = await request.formData();

  try {
    await customFetch.post("/certifications", formData);
    toast.success("certification created");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
  return null;
};

const AddCertifications = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <Wrapper>
      <Form method="post" encType="multipart/form-data">
        <h4 className="formHeading">Add Certification</h4>
        <div className="reactForm changeForm">
          <FormImageRow name="avatar" labelText="image" />
          <FormRow type="text" name="title" labelText="title" />
          <FormRow type="text" name="credentialId" labelText="credential Id" />
          <FormRow type="text" name="organisation" labelText="organisation" />
          <FormRow type="text" name="address" labelText="address" />
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
export default AddCertifications;
