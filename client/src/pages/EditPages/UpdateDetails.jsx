import { Form, redirect, useLoaderData, useNavigation } from "react-router-dom";
import Wrapper from "../../assets/wrapper/about";
import FormRow, { FormImageRow } from "../../components/formRow";
import customFetch from "../../utils/customFetch";
import { toast } from "react-toastify";
import { useHomelayoutContext } from "../HomeLayout";

export const updateUserAction = async ({ request, params }) => {
  const formData = await request.formData();
  const { data: user } = await customFetch.get("/auth/userRole");
  if (user.userRole !== "admin") return redirect("/");
  try {
    await customFetch.patch(`/auth/update-user-details/${params.id}`, formData);
    toast.success("user updated");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
  return redirect("/");
};
const UpdateDetails = () => {
    const navigation = useNavigation();
    const isSubmitting = navigation.state === "submitting";
    const {adminDetails: {name, email, phone,birthday,location,whatappUrl,LinkedUrl,GithubUrl, whatIdid,whatIdo,aboutMe,headline,extraPoints }} = useHomelayoutContext(); 
  return (
    <Wrapper>
      <Form method="post" encType="multipart/form-data">
        <h4 className="formHeading">update details</h4>
        <div className="reactForm changeForm">
          <FormImageRow name="avatar" labelText="Profile Image" />
          <FormImageRow name="avatar1" labelText="Additional Image" />{" "}
          <FormRow type="text" name="name" labelText="fullname" value={name} />
          <FormRow type="email" name="email" labelText="email" value={email} />
          <FormRow
            type="text"
            name="phone"
            labelText="phone no"
            value={phone}
          />
          <FormRow
            type="birthday"
            name="birthday"
            labelText="birthday"
            value={birthday}
          />
          <FormRow
            type="text"
            name="location"
            labelText="address"
            value={location}
          />
          <FormRow
            type="text"
            name="whatappUrl"
            labelText="whatsapp no"
            value={whatappUrl}
          />
          <FormRow
            type="text"
            name="LinkedUrl"
            labelText="LinkedUrl"
            value={LinkedUrl}
          />
          <FormRow
            type="text"
            name="GithubUrl"
            labelText="GithubUrl"
            value={GithubUrl}
          />
          <FormRow
            type="text"
            name="headline"
            labelText="headline"
            value={headline}
          />
          <FormRow
            type="text"
            name="aboutMe"
            labelText="aboutMe"
            value={aboutMe}
          />
          <FormRow
            type="text"
            name="whatIdid"
            labelText="whatIdid"
            value={whatIdid}
          />
          <FormRow
            type="text"
            name="whatIdo"
            labelText="whatIdo"
            value={whatIdo}
          />
          <FormRow
            type="text"
            name="extraPoints"
            labelText="extraPoints"
            value={extraPoints}
          />
          <button type="submit" className="formBtn" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};
export default UpdateDetails;

