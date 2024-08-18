import { Form, redirect, useLoaderData, useNavigation } from "react-router-dom";
import Wrapper from "../../assets/wrapper/about";
import FormRow, {
  FormTextareaRow,
} from "../../components/formRow";
import customFetch from "../../utils/customFetch";
import { toast } from "react-toastify";
export const EditExperienceLoader = async ({ params }) => {
   const { data:user} = await customFetch.get("/auth/userRole");
  if (user.userRole !== "admin") return redirect("/");
  try {
    const { data } = await customFetch.get(`/expriences/${params.id}`);
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return redirect("/experience");
  }
};

export const EditExperienceAction = async ({ request, params }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData)
  try {
    await customFetch.patch(`/expriences/${params.id}`, data);
    toast.success("experience updated");
    return redirect("/experience");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const EditExperience = () => {
  const { exprience } = useLoaderData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <Wrapper>
      <Form method="post">
        <h4 className="formHeading">Edit Exprience</h4>
        <div className="reactForm changeForm">
          <FormRow
            type="text"
            name="post"
            labelText="post"
            value={exprience.post}
          />
          <FormRow
            type="text"
            name="company"
            labelText="company"
            value={exprience.company}
          />
          <FormRow
            type="text"
            name="location"
            labelText="location"
            value={exprience.location}
          />
          <FormRow
            type="text"
            name="address"
            labelText="address"
            value={exprience.address}
          />
          <FormRow
            type="text"
            name="startDate"
            labelText="start-Date"
            value={exprience.startDate}
          />
          <FormRow
            type="text"
            name="endDate"
            labelText="end-Date"
            value={exprience.endDate}
          />
          <FormTextareaRow
            name="desc"
            labelText="description ( use ## to make li)"
            value={exprience.desc}
          />
          <button type="submit" className="formBtn" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};
export default EditExperience;
