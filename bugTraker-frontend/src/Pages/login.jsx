import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
function Login({ userauthlogin, setUser, user }) {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState({});
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();

 
  if (user!==null) {
   
      return <Navigate to="/" />;

  }

  function validate() {
    const errs = {};
    if (!email.trim()) errs.email = "Email is not valid";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errs.email = "Email is not valid";
    if (!password.trim()) errs.password = "Password is required";

    return errs;
  }
  async function handler(e) {
    e.preventDefault();
    const validateerrors = validate();
    if (Object.keys(validateerrors).length > 0) {
      seterror(validateerrors);
      return;
    }
    setloading(true);
    seterror({});
    const loginuser = {
      email,
      password,
    };
    try {
      const res = await userauthlogin(loginuser);
      
      if (!res) {
        toast.error("No user found with these credentials");
        seterror({ general: "No user found with these credentials." });
        return;
      } else {
        toast.success("Login Successfully");
        navigate("/bugs", { replace: true });
        setUser(loginuser);
      }
    } catch (error) {
      console.error("Login error:", error);
      seterror({ general: "Something went wrong. Try again." });
    } finally {
      setloading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <form
        onSubmit={handler}
        className="flex w-full max-w-md flex-col gap-4 rounded-lg bg-white p-8 shadow-lg"
      >
        <h2 className="text-2xl font-semibold text-center">Login</h2>
        {error.general && (
          <p className="text-red-500 text-sm text-center">{error.general}</p>
        )}
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <Input
            id="email"
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
          {error.email && (
            <p className="text-red-500 text-sm text-center">{error.email}</p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="text-sm font-medium">
            Password
          </label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            className="w-full"
          />
          {error.password && (
            <p className="text-red-500 text-sm text-center">{error.password}</p>
          )}
        </div>
        <Button
          type="submit"
          className={cn(
            "mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white",
            "transition-colors duration-200",
          )}
          disabled={loading}
        >
          {loading ? "Logging in.." : "Submit"}
        </Button>
        <p className="text-sm text-center text-gray-600 mt-4">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
