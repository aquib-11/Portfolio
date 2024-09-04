import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  HomeLayout,
  About,
  Certification,
  Work,
  Experience,
  Contact,
  Error,
  Login,
  AdminThings,
  AddThings,
  AddExperience,
  AddTechstack,
  Inbox,
  EditProject,
  SingleProject,
  Techstack,
  EditTech,
  EditExperience,
  AddCertifications,
  UpdateDetails,
} from "./pages";

import { LoginAction } from "./pages/Login";
import { LogoutAction, homeLayoutLoader } from "./pages/HomeLayout";
import {  thingsAction } from "./pages/AdminPages/AddThings";
import { WorkLoader } from "./pages/Work";
import {
  EditProjectAction,
  EditProjectLoader,
} from "./pages/EditPages/EditProject";
import { EditTechAction, EditTechLoader } from "./pages/EditPages/EditTech";
import {
  EditExperienceAction,
  EditExperienceLoader,
} from "./pages/EditPages/EditExprience";
import { RegisterAction } from "./pages/Register";

import { DeleteProjectAction } from "./pages/deletePages/DeleteProject";
import { DeleteTechAction } from "./pages/deletePages/DeleteTech";
import { SingleProjectLoader } from "./pages/GetSingle/SingleProject";
import { AddTechAction } from "./pages/AdminPages/AddTeckstack";
import { TechLoader } from "./pages/Techstack";
import { ContactAction } from "./pages/Contact";
import { InboxLoader } from "./pages/AdminPages/Inbox";
import { InboxAction } from "./pages/EditPages/EditMessage";
import { DeleteInboxAction } from "./pages/deletePages/DeleteInbox";
import { ExperienceLoader } from "./pages/Experience";
import { DeleteExprienceAction } from "./pages/deletePages/DeleteExprience";
import { AddExprienceAction } from "./pages/AdminPages/AddExperience";
import { AddCertificationsAction } from "./pages/AdminPages/AddCertifications";
import { CertificationLoader } from "./pages/Certification";
import { DeleteCertificationAction } from "./pages/deletePages/DeleteCertification";
import Register from "./pages/Register";
import EditCertification, { EditCertificationAction, EditCertificationLoader } from "./pages/EditPages/EditCertification";
import SingleCertification, { singleCertificationLoader } from "./pages/GetSingle/SingleCertification";
import { updateUserAction } from "./pages/EditPages/UpdateDetails";
import { protectedLoader } from "./utils/PtotectRoutesByLoader";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    loader: homeLayoutLoader,
    children: [
      {
        index: true,
        element: <About />,
      },
      {
        path: "/certification",
        element: <Certification />,
        loader: CertificationLoader,
      },
      {
        path: "/work",
        element: <Work />,
        loader: WorkLoader,
      },
      {
        path: "/techstack",
        element: <Techstack />,
        loader: TechLoader,
      },
      {
        path: "/experience",
        element: <Experience />,
        loader: ExperienceLoader,
      },
      {
        path: "/delete-experience/:id",
        action: DeleteExprienceAction,
        loader: protectedLoader,
      },
      {
        path: "/edit-experience/:id",
        element: <EditExperience />,
        loader: EditExperienceLoader,
        action: EditExperienceAction,
      },
      {
        path: "/contact",
        element: <Contact />,
        action: ContactAction,
      },
      {
        path: "/login",
        element: <Login />,
        action: LoginAction,
      },
      // {
      //   path: "register",
      //   element: <Register />,
      //   action: RegisterAction,
      // },
      {
        path: "/edit-project/:id",
        element: <EditProject />,
        loader: EditProjectLoader,
        action: EditProjectAction,
      },
      {
        path: "/edit-certification/:id",
        element: <EditCertification />,
        loader: EditCertificationLoader,
        action: EditCertificationAction,
      },
      { path: "/edit-message/:id", action: InboxAction },
      {
        path: "/edit-tech/:id",
        element: <EditTech />,
        loader: EditTechLoader,
        action: EditTechAction,
      },
      {
        path: "/update-details/:id",
        element: <UpdateDetails />,
        // loader: EditTechLoader,
        action: updateUserAction,
        loader: protectedLoader,
      },

      {
        path: "/delete-project/:id",
        action: DeleteProjectAction,
        loader: protectedLoader,
      },
      {
        path: "/delete-message/:id",
        action: DeleteInboxAction,
        loader: protectedLoader,
      },
      {
        path: "/delete-certification/:id",
        action: DeleteCertificationAction,
        loader: protectedLoader,
      },

      {
        path: "/delete-tech/:id",
        action: DeleteTechAction,
        loader: protectedLoader,
      },
      { path: "/logout", action: LogoutAction },

      {
        path: "/adminthings",
        element: <AdminThings />,
        loader: protectedLoader,
        children: [
          {
            index: true,
            element: <AddThings />,
            action: thingsAction,
          },
          {
            path: "addExperience",
            element: <AddExperience />,
            action: AddExprienceAction,
          },
          {
            path: "addTeckstack",
            element: <AddTechstack />,
            action: AddTechAction,
          },
          {
            path: "addCertification",
            element: <AddCertifications />,
            action: AddCertificationsAction,
          },
          //add certifications
          {
            path: "inbox",
            element: <Inbox />,
            loader: InboxLoader,
          },
        ],
      },
    ],
  },
  {
    path: "/single-project/:id",
    element: <SingleProject />,
    loader: SingleProjectLoader,
  },
  {
    path: "/single-certification/:id",
    element: <SingleCertification />,
    loader: singleCertificationLoader,
  },
]);
const App = () => {
  return <RouterProvider router={router} />;
};
export default App;
