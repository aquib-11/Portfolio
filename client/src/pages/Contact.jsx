import Wrapper from "../assets/wrapper/about";
import { Form, useNavigation } from "react-router-dom";
import FormRow, { FormTextareaRow } from "../components/formRow";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import styled from "styled-components";
import { useState } from "react";
import { FaToggleOn } from "react-icons/fa";
import { FaToggleOff } from "react-icons/fa6";
import { useAuth0 } from "@auth0/auth0-react";
import { useHomelayoutContext } from "./HomeLayout";

// domian
// dev-u807c7oigyo5yvp7.us.auth0.com
// client id
// vicpgfMK9cBig216q4LRk9077ZW3hQfi
export const ContactAction = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post("/inboxs", data);
    toast.success("message sent sucessflly");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
  return null;
};

const Contact = () => {
    const {  user:{userRole}  } = useHomelayoutContext();

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  // user auth
  const { isAuthenticated, loginWithRedirect, isLoading, user  } =
    useAuth0();
  const isUser = isAuthenticated && user;
  return (
    <Wrapper>
      <Div className="head">
        <h1>Get in touch</h1>
        <p>Let's create something extraordinary.</p>
        <Form method="post" encType="multipart/form-data">
          <div className={`reactForm`}>
            <FormRow
              type="name"
              name="name"
              labelText="name"
              value={isUser && user.name}
            />
            <FormRow
              type="email"
              name="email"
              labelText="email"
              value={user && user.email}
            />
            <FormRow type="subject" name="subject" labelText="subject" />
            <FormTextareaRow name="message" labelText="message" />
            {isUser || userRole ==="admin" ? (
              <button type="submit" className="formBtn" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            ) : (
              <button
                className="formBtn"
                style={{ textTransform: "lowercase" }}
                type="button"
                onClick={async () => {
                  loginWithRedirect();
                }}
              >
                login first
              </button>
            )}
          </div>
        </Form>
      </Div>
    </Wrapper>
  );
};
const Div = styled.div`
  h1 {
    text-align: center;
    margin-top: 1rem;
  }
  p {
    color: var(--sec-color);
    text-align: center;
  }
    @media only screen and (max-width: 600px) {
      h1{
        margin: 0;
      }
    }
`;
export default Contact;
