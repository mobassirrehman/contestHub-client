import { Outlet } from "react-router";
import Logo from "../components/Logo/Logo";

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-base-200">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Logo></Logo>
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 mt-8">
          <div className="flex-1 max-w-md w-full">
            <Outlet />
          </div>
          <div className="flex-1 hidden lg:block">
            <img
              src="https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg"
              alt="Authentication"
              className="w-full max-w-lg mx-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
