import { FaGoogle } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const SocialLogin = () => {
  const { signInGoogle } = useAuth();
  const axiosPublic = useAxiosSecure();
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state || "/";

  const handleGoogleSignIn = () => {
    signInGoogle()
      .then((result) => {
        const user = result.user;

        const userInfo = {
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        };

        axiosPublic.post("/users", userInfo).then(() => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Login Successful!",
            text: `Welcome, ${user.displayName}!`,
            showConfirmButton: false,
            timer: 2000,
          });
          navigate(from);
        });
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "Google sign-in failed. Please try again.",
        });
      });
  };

  return (
    <div className="space-y-3">
      <button
        onClick={handleGoogleSignIn}
        className="btn btn-outline w-full gap-2"
      >
        <FaGoogle className="text-lg" />
        Continue with Google
      </button>
    </div>
  );
};

export default SocialLogin;
