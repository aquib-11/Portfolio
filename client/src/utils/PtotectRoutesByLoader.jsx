import { redirect } from "react-router-dom";
import customFetch from "./customFetch";

export const protectedLoader = async () => {
  const { data } = await customFetch.get("/auth/userRole");
  if (data.userRole === "admin") return null;
  else {
  return  redirect("/");
  }
};
