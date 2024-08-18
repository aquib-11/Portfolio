import { toast } from "react-toastify";
import customFetch from "../../utils/customFetch";
import { redirect } from "react-router-dom";

export const DeleteTechAction = async ({ params }) => {
  try {
    await customFetch.delete(`/techstacks/${params.id}`);
    toast.success("tech deleted");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
  return redirect("/techstack");
};
