import { useEffect } from "react";
import { Link, useNavigate } from "@tanstack/react-router";

import Layout from "../components/Layout/Layout";
import Button from "../components/Buttons/Button";
import { isNotAuthenticated } from "../lib/useToken";

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    isNotAuthenticated(navigate);
  }, []);

  return (
    <Layout>
      <div className="items-center flex-col flex bg-[#131313] p-5 rounded-lg">
        <img src="AuthLogo.png" className=" h-[200px]" alt="" />
        <div className="grid gap-2 w-full">
          <Button>
            <Link to="/auth/register">Register</Link>
          </Button>
          <Button>
            <Link to="/auth/login">Login</Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default App;
