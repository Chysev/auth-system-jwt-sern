import { useEffect, useState, MouseEvent } from "react";
import { useNavigate, Link } from "@tanstack/react-router";

import Axios from "../../lib/Axios";
import { LoginState } from "../../types";
import Logo from "../../components/Icons/Logo";
import Input from "../../components/Inputs/Input";
import Layout from "../../components/Layout/Layout";
import emailValidator from "../../lib/emailValidator";
import { isNotAuthenticated } from "../../lib/useToken";

const Login = () => {
  const navigate = useNavigate();

  const [log, setLog] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [login, setLogin] = useState<LoginState>({
    email: "",
    password: "",
  });

  useEffect(() => {
    isNotAuthenticated(navigate);
  }, []);

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!emailValidator(login.email)) {
      setLog("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);
    Axios.post("/auth/login", {
      email: login.email,
      password: login.password,
    })
      .then((res) => {
        if (res) {
          navigate({ to: "/profile" });
        } else {
          console.error("Invalid response:", res);
          setLog("Invalid response from server");
        }
      })
      .catch((err) => {
        if (err && err.response && err.response.data) {
          console.error("Error:", err);
          setLog(err.response.data.message);
        } else {
          console.error("Invalid error response:", err);
          setLog("Invalid error response from server");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Layout>
      <div className="max-w-[390px] w-full">
        <div className="flex flex-col bg-[#131313] px-5 py-2 rounded-[16px] items-center">
          <Logo />
          <div className="flex flex-col gap-3 w-full justify-center items-center">
            {log && <p className="text-red-500">{log}</p>}

            <div className="w-full grid gap-2">
              <label className="text-gray-100" htmlFor="email">
                Email
              </label>
              <Input
                type="text"
                name="name"
                onChange={(e) => setLogin({ ...login, email: e.target.value })}
              />
            </div>

            <div className="w-full grid gap-2">
              <label className="text-gray-100" htmlFor="password">
                Password
              </label>
              <Input
                type="password"
                name="password"
                onChange={(e) =>
                  setLogin({ ...login, password: e.target.value })
                }
              />
              <Link
                to="/auth/register"
                className="text-red-400 hover:text-green-400 text-[12px]"
              >
                Create account
              </Link>
            </div>

            {isLoading ? (
              <div className="text-gray-100 py-10">Logging in...</div>
            ) : (
              <button onClick={handleSubmit}>
                <img
                  src="/CHEVRON_BUTTON_LOGIN.svg"
                  className="h-[100px] py-[14px]"
                  alt="Login"
                />
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
