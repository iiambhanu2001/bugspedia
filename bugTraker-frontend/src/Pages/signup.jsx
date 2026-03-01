import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
function Register({ userauth, user }) {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [errors, seterrors] = useState({});
  const navigate = useNavigate();

  if (user!==null) {
   
    toast.error("Logout to create another account");
    navigate("/");
    return;
  }

  function validate() {
    const errs = {};
    if (!name.trim()) {
      errs.name = "Name is required";
    }
    if (!email.trim()) {
      errs.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) errs.email = "Email is not valid";
    if (!password.trim()) {
      errs.password = "Password is required";
    } else if (password.length < 6)
      errs.password = "Password must be atleast 6 characters";
    return errs;
  }

  async function handler(e) {
    e.preventDefault();
    const validateerrors = validate();
    if (Object.keys(validateerrors).length > 0) {
      seterrors(validateerrors);
      return;
    }
    seterrors({});
    const loginuser = {
      name,
      email,
      password,
    };

    try {
      const res = await userauth(loginuser);
     
      if (res) {
        toast.success("Account Created Successfully");
        navigate("/login");
      } else {
        toast.error("something went wrong");
      }
    } catch (error) {
      toast.error("server error");
    }
  }
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <form
        onSubmit={handler}
        className="flex w-full max-w-md flex-col gap-4 rounded-lg bg-white p-8 shadow-lg"
      >
        <h2 className="text-2xl font-semibold text-center">Register</h2>

        <div className="flex flex-col gap-1">
          <Input
            id="name"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setname(e.target.value)}
            className="w-full"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>
        <div className="flex flex-col gap-1">
          <Input
            id="email"
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            className="w-full"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            className="w-full"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}

          <Button
            type="submit"
            className={cn(
              "mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white",
              "transition-colors duration-200",
            )}
          >
            Sign up
          </Button>
          <p className="text-center text-sm text-gray-600 mt-2">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-blue-500 hover:underline cursor-pointer"
            >
              Login
            </span>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Register;
