import { toast } from "react-toastify";
import customFetch from "../../utils/customFetch";
import { redirect } from "react-router-dom";

export const InboxAction = async ({ request, params }) => {
  const formData = {isread: true};
  try {
    await customFetch.patch(`/inboxs/${params.id}`, {});
    toast.success("inbox read");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
    return redirect("/adminthings/inbox");

};