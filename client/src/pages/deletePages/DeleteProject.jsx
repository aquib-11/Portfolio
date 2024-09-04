import { toast } from "react-toastify"
import customFetch from "../../utils/customFetch"
import { redirect } from "react-router-dom"

export const DeleteProjectAction = async ( {params}) =>{
   try {
   await customFetch.delete(`/projects/${params.id}`)
   toast.success("project deleted")
   } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error
   }
   return redirect("/work")
}
