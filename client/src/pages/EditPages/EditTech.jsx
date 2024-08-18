import { Form, redirect, useLoaderData, useNavigation } from "react-router-dom";
import Wrapper from "../../assets/wrapper/about";
import FormRow, {
  FormImageRow,
} from "../../components/formRow";
import customFetch from "../../utils/customFetch";
import { toast } from "react-toastify";


export const EditTechLoader = async ({ params }) => {
  const { data: user } = await customFetch.get("/auth/userRole");
  if (user.userRole !== "admin") return redirect("/");
  try {
    const { data } = await customFetch.get(`/techstacks/${params.id}`);
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return redirect("/techstack");
  }
};

export const EditTechAction = async ({ request, params }) => {
  const formData = await request.formData();
  try {
    await customFetch.patch(`/techstacks/${params.id}`, formData);
    toast.success("tech updated");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
 return redirect("/techstack");
};

const EditTech = () => {
  const { stack } = useLoaderData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <Wrapper>
      <Form method="post" encType="multipart/form-data">
        <h4 className="formHeading">Update Teckstack</h4>
        <div className="reactForm changeForm">
          <FormImageRow name="avatar" labelText="image" />
          <FormRow
            type="text"
            name="type"
            labelText="category"
            value={stack.type}
          />
          <FormRow
            type="text"
            name="title"
            labelText="title"
            value={stack.title}
          />
          <FormRow
            type="text"
            name="language"
            labelText="type"
            value={stack.language}
          />
          <FormRow
            type="text"
            name="address"
            labelText="address"
            value={stack.address}
          />
          <button type="submit" className="formBtn" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};
export default EditTech;
