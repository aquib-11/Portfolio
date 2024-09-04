import { Form, Link, redirect, useNavigation } from "react-router-dom";
import Wrapper from "../assets/wrapper/about";
import FormRow from "../components/formRow";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const LoginAction = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    const response = await customFetch.post("/auth/login", data);
    toast.success("logged in");
    return redirect("/");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};
const Login = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <Wrapper>
      <Form method="post">
        <h4 className="formHeading">Admin Login</h4>
        <div className="reactForm">
          <FormRow type="email" name="email" labelText="email" />
          <FormRow type="password" name="password" labelText="password" />
          <button type="submit" className="formBtn" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};
export default Login;
