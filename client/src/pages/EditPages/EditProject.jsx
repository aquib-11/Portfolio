import { Form, redirect, useLoaderData, useNavigation } from "react-router-dom"
import Wrapper from "../../assets/wrapper/about"
import FormRow, { FormImageRow, FormSelectRow, FormTextareaRow } from "../../components/formRow"
import { PROJECT_TYPE } from "../../../../utils/contants"
import customFetch from "../../utils/customFetch"
import { toast } from "react-toastify"
export const EditProjectLoader = async({params}) =>{
  const { data: user } = await customFetch.get("/auth/userRole");
  if (user.userRole !== "admin") return redirect("/");
try {
    const {data} = await customFetch.get(`/projects/${params.id}`)
    return data
} catch (error) {
toast.error(error?.response?.data?.msg);
return redirect("/work")}
}

export const EditProjectAction = async ({request, params}) => {
const formData = await request.formData()
try {
    await customFetch.patch(`/projects/${params.id}`, formData)
    toast.success("project updated")
    return redirect("/work")}
catch (error) {
   toast.error(error?.response?.data?.msg);
   return error
}

};

const EditProject = () => {
    const {project} = useLoaderData()
   const navigation = useNavigation();
   const isSubmitting = navigation.state === "submitting";
   return (
     <Wrapper>
       <Form method="post" encType="multipart/form-data">
         <h4 className="formHeading">Edit Work</h4>
         <div className="reactForm changeForm">
           <FormImageRow name="avatar" labelText="image" />
           <FormRow
             type="text"
             name="title"
             labelText="title"
             value={project.title}
           />
           <FormRow
             type="text"
             name="address"
             labelText="address"
             value={project.address}
           />
           <FormRow
             type="text"
             name="technologyUsed"
             labelText="technologyUsed"
             value={project.technologyUsed}
           />
           <FormSelectRow
             name="projectType"
             labelText="project type"
             value={project.projectType}
             list={Object.values(PROJECT_TYPE)}
           />
           <FormTextareaRow
             name="desc"
             labelText="description"
             value={project.desc}
           />
           <button type="submit" className="formBtn" disabled={isSubmitting}>
             {isSubmitting ? "Submitting..." : "Submit"}
           </button>
         </div>
       </Form>
     </Wrapper>
   );
}
export default EditProject