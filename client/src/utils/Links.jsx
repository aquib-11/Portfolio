import React from "react";

import { CgProfile } from "react-icons/cg";
import { RiMessage2Line } from "react-icons/ri";
import { FaBoxOpen } from "react-icons/fa";
import { IoNewspaperOutline } from "react-icons/io5";
import { GrTechnology } from "react-icons/gr";
import { GrUserAdmin } from "react-icons/gr";
import { AiOutlineLogin } from "react-icons/ai";
import { FaBusinessTime } from "react-icons/fa6";

const Links = [
  {
    text: "About",
    path: "/",
    icon: <CgProfile />,
  },
  {
    text: "Work",
    path: "work",
    icon: <FaBoxOpen />,
  },
  {
    text: "Teckstack",
    path: "techstack",
    icon: <GrTechnology />,
  },
  {
    text: "Experience",
    path: "experience",
    icon: <FaBusinessTime />,
  },
  {
    text: "Certification",
    path: "certification",
    icon: <IoNewspaperOutline />,
  },
  {
    text: "Contact",
    path: "contact",
    icon: <RiMessage2Line />,
  },
  {
    text: " Login",
    path: "login",
    icon: <AiOutlineLogin />,
  },
  {
    text: "Admin Things",
    path: "adminthings",
    icon: <GrUserAdmin />,
  },
];
export const addThingsList = [
  {
    text: "Add Project",
    path: "/adminthings",
  },
  {
    text: "Add Experience",
    path: "addExperience",
  },
  {
    text: "Add Teckstack",
    path: "addTeckstack",
  },
  {
    text: "Add Certification",
    path: "addCertification",
  },
  {
    text: "Inbox",
    path: "inbox",
  },
];

export default Links;
