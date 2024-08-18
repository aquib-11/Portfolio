import {
  Form,
  Link,
  redirect,
  useActionData,
  useNavigation,
} from "react-router-dom";
import Wrapper from "../assets/wrapper/about";
import FormRow from "../components/formRow";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const RegisterAction = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post("/auth/register", data);
    toast.success("please check your mail");
    return true;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};
const Register = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const bool = useActionData(RegisterAction) || false;
  return (
    <Wrapper>
      <Form method="post">
        <h4 className="formHeading">Register Page</h4>
        {bool && <p style={{color:"green"}}>Please Check your mail to confirm account</p>}
        <div className="reactForm">
          <FormRow type="text" name="name" labelText="Fullname" />
          <FormRow type="email" name="email" labelText="email" />
          <FormRow type="password" name="password" labelText="password" />
          <button type="submit" className="formBtn" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
          <p>
            <Link className="register" to="../login">
              Already have an account?
            </Link>
          </p>
        </div>
      </Form>
    </Wrapper>
  );
};
export default Register;
