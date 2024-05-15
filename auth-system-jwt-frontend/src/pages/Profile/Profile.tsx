import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

import Loading from "./Loading";
import Axios from "../../lib/Axios";
import Layout from "../../components/Layout/Layout";
import Button from "../../components/Buttons/Button";
import useToken, { isAuthenticated } from "../../lib/useToken";

const Profile = () => {
  const navigate = useNavigate();

  useEffect(() => {
    isAuthenticated(navigate);
  }, []);

  const logout = async () => {
    try {
      await Axios.get("/auth/logout");
      navigate({ to: "/auth/login" });
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const deleteAccount = async () => {
    try {
      await Axios.delete("/api/delete-account");
      navigate({ to: "/auth/login" });
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  const {
    isLoading,
    error,
    data: datas,
  } = useQuery({
    queryKey: ["token"],
    queryFn: async () => {
      return useToken();
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    console.error("Error fetching session:", error);
    return (
      <Layout>
        <p>Error: {error.message}</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex justify-between items-center max-w-[700px] w-full bg-[#131313] p-4 rounded-[16px]">
        <div className="flex flex-col gap-[20px]">
          <h1 className="text-[24px] text-gray-100">Profile</h1>

          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <h2 className="text-[20px] text-gray-100">Name:</h2>
              <p className="text-gray-300">{datas.user.name}</p>
            </div>

            <div className="flex items-center gap-2">
              <h2 className="text-[20px] text-gray-100">Email:</h2>
              <p className="text-gray-300">{datas.email}</p>
            </div>

            <div className="flex items-center gap-2">
              <h2 className="text-[20px] text-gray-100">Role:</h2>
              <p className="text-gray-300">{datas.user.role}</p>
            </div>

            <div className="grid gap-3">
              <Button onClick={logout}>Logout</Button>
              <Button onClick={deleteAccount}>Delete Account</Button>
              {/* <a
                href="/member/list"
                className="text-red-500 hover:text-green-600"
              >
                Member List
              </a> */}
            </div>
          </div>
        </div>
        <div>
          <img
            src={`${datas?.user.avatarUrl}`}
            alt="Profile"
            className="rounded-full h-[300px]"
          />
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
