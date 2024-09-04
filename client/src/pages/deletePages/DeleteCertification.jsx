import { toast } from "react-toastify";
import customFetch from "../../utils/customFetch";
import { redirect } from "react-router-dom";

export const DeleteCertificationAction = async ({ params }) => {
  try {
    await customFetch.delete(`/certifications/${params.id}`);
    toast.success("certificate deleted");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
  return redirect("/certification");
};
