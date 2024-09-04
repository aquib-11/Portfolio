import { toast } from "react-toastify";
import customFetch from "../../utils/customFetch";
import { redirect } from "react-router-dom";

export const DeleteExprienceAction = async ({ params }) => {
  try {
    await customFetch.delete(`/expriences/${params.id}`);
    toast.success("exprience deleted");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
  return redirect("/experience");
};
