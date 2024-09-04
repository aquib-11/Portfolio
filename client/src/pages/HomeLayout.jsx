import { Outlet, redirect, ScrollRestoration, useLoaderData, useNavigate } from "react-router-dom";
import Wrapper from "../assets/wrapper/HomeLayout";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import customFetch from "../utils/customFetch";
import { useContext, useState } from "react";
import { createContext } from "react";
import { toast } from "react-toastify";
import MobileNav from "../components/MobileNav";
export const LogoutAction = async () => {
  await customFetch.get("/auth/logout");
  toast.success("logged out");
  return redirect("/");
};
const HomelayoutContext = createContext();

export const homeLayoutLoader = async () => {
  try {
    const { data:user } = await customFetch.get("/auth/userRole");
    const { data: adminDetails } = await customFetch.get("/auth/admin-data");
    // const {data}
    
    return {user,adminDetails};
  } catch (error) {
    return error;
  }
};

const checkTheme = () => {
  const theme = localStorage.getItem("theme") === "true";
  document.body.classList.toggle("Sky_mode", theme);
  return theme;
};

const HomeLayout = () => {
  const { user, adminDetails:{adminDetails} } = useLoaderData();
  const [theme, setTheme] = useState(checkTheme());
  const toggleTheme = () => {
    const newTheme = !theme;
    setTheme(newTheme);
    document.body.classList.toggle("Sky_mode", newTheme);
    localStorage.setItem("theme", newTheme);
  };
  
  return (
    <HomelayoutContext.Provider
      value={{ theme, toggleTheme, user, adminDetails }}
    >
      <Wrapper className="jacket">
        <ScrollRestoration/>
        <Header />
        <div className="grid">
          <Navbar user={user} />
          <Outlet context={user} />
        </div>
        <Footer />
        <MobileNav user={user} />
      </Wrapper>
    </HomelayoutContext.Provider>
  );
};
export const useHomelayoutContext = () => useContext(HomelayoutContext);

export default HomeLayout;
