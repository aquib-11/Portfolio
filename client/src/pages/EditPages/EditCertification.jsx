import { Form, redirect, useLoaderData, useNavigation } from "react-router-dom";
import Wrapper from "../../assets/wrapper/about";
import FormRow, {
  FormImageRow,
  FormSelectRow,
  FormTextareaRow,
} from "../../components/formRow";
import customFetch from "../../utils/customFetch";
import { toast } from "react-toastify";
export const EditCertificationLoader = async ({ params }) => {
  const { data: user } = await customFetch.get("/auth/userRole");
  if (user.userRole !== "admin") return redirect("/");
  try {
    const { data } = await customFetch.get(`/certifications/${params.id}`);
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return redirect("/certifications");
  }
};

export const EditCertificationAction = async ({ request, params }) => {
  const formData = await request.formData();
  try {
    await customFetch.patch(`/certifications/${params.id}`, formData);
    toast.success("certificate updated");
    return redirect("/certification");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const EditCertification = () => {
  const { certification } = useLoaderData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <Wrapper>
      <Form method="post" encType="multipart/form-data">
        <h4 className="formHeading">Update Certification</h4>
        <div className="reactForm changeForm">
          <FormImageRow name="avatar" labelText="image" />
          <FormRow
            type="text"
            name="title"
            value={certification.title}
            labelText="title"
          />
          <FormRow
            type="text"
            name="credentialId"
            value={certification.credentialId}
            labelText="credential Id"
          />
          <FormRow
            type="text"
            name="organisation"
            value={certification.organisation}
            labelText="organisation"
          />
          <FormRow
            type="text"
            name="address"
            labelText="address"
            value={certification.address}
          />
          <FormTextareaRow
            name="desc"
            labelText="description ( use ## to make li)"
            value={certification.desc}
          />
          <button type="submit" className="formBtn" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};
export default EditCertification;
