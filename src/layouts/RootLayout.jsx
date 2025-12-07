import { Outlet } from "react-router";
import NavBar from "../pages/Shared/Navbar";
import Footer from "../pages/Shared/Footer";

const RootLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar></NavBar>
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer></Footer>
    </div>
  );
};

export default RootLayout;
