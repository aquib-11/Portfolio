import { toast } from "react-toastify";
import customFetch from "../../utils/customFetch";
import { redirect } from "react-router-dom";

export const DeleteInboxAction = async ({ params }) => {
  try {
    await customFetch.delete(`/inboxs/${params.id}`);
    toast.success("inbox deleted");

  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
        return redirect("/adminthings/inbox");

};
