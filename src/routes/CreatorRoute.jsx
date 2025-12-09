import Forbidden from "../components/Forbidden/Forbidden";
import Loading from "../components/Loading/Loading";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";

const CreatorRoute = ({ children }) => {
  const { loading } = useAuth();
  const { role, roleLoading } = useRole();

  if (loading || roleLoading) {
    return <Loading></Loading>;
  }

  if (role !== "creator" && role !== "admin") {
    return <Forbidden></Forbidden>;
  }

  return children;
};

export default CreatorRoute;
