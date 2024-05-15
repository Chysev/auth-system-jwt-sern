import { useEffect, useState } from "react";
import { useNavigate, Link } from "@tanstack/react-router";

import Axios from "../../lib/Axios";
import { RegisterState } from "../../types";
import Logo from "../../components/Icons/Logo";
import Input from "../../components/Inputs/Input";
import Layout from "../../components/Layout/Layout";
import Button from "../../components/Buttons/Button";
import emailValidator from "../../lib/emailValidator";
import { isNotAuthenticated } from "../../lib/useToken";

const Register = () => {
  const navigate = useNavigate();

  const [log, setLog] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [register, setRegister] = useState<RegisterState>({
    user: {
      name: "",
      avatarUrl: null,
    },
    email: "",
    password: "",
  });

  useEffect(() => {
    isNotAuthenticated(navigate);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];

    setRegister({
      ...register,
      user: {
        ...register.user,
        avatarUrl: file,
      },
    });
  };

  const handleSubmit = (e: Event) => {
    e.preventDefault();

    if (!register.user.name.trim()) {
      setLog("Please enter your name.");
      return;
    }

    if (!emailValidator(register.email)) {
      setLog("Please enter a valid email address.");
      return;
    }

    if (register.password.length < 8) {
      setLog("Password must be at least 8 characters long.");
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append("name", register.user.name);
    formData.append("email", register.email);
    formData.append("password", register.password);

    if (register.user.avatarUrl) {
      formData.append("avatarUrl", register.user.avatarUrl);
    }

    Axios.post("/auth/register", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        if (res && res.data) {
          setLog(res.data);
        } else {
          console.error("Invalid response:", res);
          setLog("Invalid response from server");
        }
      })
      .catch((err) => {
        if (err && err.response && err.response.data) {
          console.error("Error:", err);
          setLog(err.response.data);
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
      <form encType="multipart/form-data" className="max-w-[390px] w-full">
        <div className="flex flex-col bg-[#131313] px-5 py-5 rounded-[16px] items-center">
          <Logo />
          <div className="flex flex-col gap-3 w-full justify-center items-center">
            {log === "Account Created" && (
              <p className="text-green-500">{log}</p>
            )}
            {log === "Account is already taken" && (
              <p className="text-red-500">{log}</p>
            )}

            <div className="w-full grid gap-2">
              <label className="text-gray-100" htmlFor="email">
                Name
              </label>

              <Input
                type="text"
                name="name"
                onChange={(e) =>
                  setRegister((prevState) => ({
                    ...prevState,
                    user: {
                      ...prevState.user,
                      name: e.target.value,
                    },
                  }))
                }
              />
            </div>

            <div className="w-full grid gap-2">
              <label className="text-gray-100" htmlFor="email">
                Email
              </label>
              <Input
                type="email"
                name="email"
                onChange={(e) =>
                  setRegister({ ...register, email: e.target.value })
                }
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
                  setRegister({ ...register, password: e.target.value })
                }
              />

              <label
                htmlFor="avatarUrl"
                className="w-full py-[6px] hover:cursor-pointer hover:opacity-[0.8] px-4 mt-3 outline-none bg-[#2a2a2a] text-center text-gray-100"
              >
                {register.user.avatarUrl
                  ? register.user.avatarUrl.name
                  : "Upload Image (Less 1MB)"}
              </label>
              <input
                id="avatarUrl"
                type="file"
                name="avatar"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />

              <Link
                to="/auth/login"
                className="text-red-400 hover:text-green-400 text-[12px]"
              >
                Login
              </Link>
            </div>

            {isLoading ? (
              <Button disabled className="opacity-5">
                Registering...
              </Button>
            ) : (
              // <div className="text-gray-100">Registering...</div>
              <Button onClick={handleSubmit}>Register</Button>
            )}
          </div>
        </div>
      </form>
    </Layout>
  );
};

export default Register;
