import "./App.css";

import Bugs from "./Pages/buglist";
import Bug from "./Pages/bugdetails";
import Dashboard from "./Pages/dashboard";
import Layout from "./layout/Layout";

import Login from "./Pages/login";
import Register from "./Pages/signup";
import Logout from "./Pages/logout";
import Getdata from "./services/bugs";
import Protectedroute from "./Pages/protectedroute";

import { Routes, Route } from "react-router-dom";
import Addabug from "./components/add-a-bug";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import NotFound from "./Pages/notFound";
function App() {
  const [inputdata, setinputdata] = useState([]);
  const [user, setUser] = useState("");

  async function fetchbugs() {
    const res = await Getdata();
    const data = await res.json();

    if (!res.ok) {
      toast.error("something went wrongs. Please wait!!!");
      return;
    }

    setinputdata(data);
  }

  useEffect(() => {
    fetchbugs();
  }, []);

  async function authfrontend() {
    try {
      const res = await fetch("https://bugspedia.onrender.com/api/user/protected", {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) {
        setUser(null);
        return;
      }
      const data = await res.json();

      if (!data.id) {
        setUser(null);
      } else setUser(data);
    } catch (error) {
      setUser(null);
    }
  }
  useEffect(() => {
    if (user) {
      authfrontend();
    }
  }, []);

  async function addbugs(newbug) {
    const res = await fetch("https://bugspedia.onrender.com/api/bug/", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newbug),
      credentials: "include",
    });

    if (!res.ok) {
      toast.error("Try Again please.");
    }
    await fetchbugs();
  }
  async function removeBugs(id) {
    const res = await fetch(`https://bugspedia.onrender.com/api/bug/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
      credentials: "include",
    });
    if (!res.ok) {
      toast.error("You have no permission");
    }
    await fetchbugs();
  }
  async function removesol(id, solid) {
    const res = await fetch(
      `https://bugspedia.onrender.com/api/bug/${id}/sol/${solid}/`,
      {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
      },
    );
    if (!res.ok) {
      toast.error("Sorry,You don't have permission");
    }
    await fetchbugs();
  }

  async function editbugs(updatedbug, id) {
    const res = await fetch(`https://bugspedia.onrender.com/api/bug/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(updatedbug),
    });
    if (!res.ok) {
      toast.error("Sorry,You don't have permission");
    }
    await fetchbugs();
  }
  async function userauth(userdata) {
    try {
      const res = await fetch("https://bugspedia.onrender.com/api/user/register", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(userdata),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Sign up failed");
      }
      return data;
    } catch (error) {
  
      return null;
    }
  }

  async function userauthlogin(userdata) {
    try {
      const res = await fetch("https://bugspedia.onrender.com/api/user/login", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(userdata),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }
      return data;
    } catch (error) {
    
      return null;
    }
  }
  async function logout() {
    try {
      const res = await fetch("https://bugspedia.onrender.com/api/user/logout", {
        method: "GET",

        credentials: "include",
      });
      await res.json();
      if (res.ok) {
        setUser(null);
      } else {
        toast.error("Logout failed. Please try again.");
      }
    } catch (error) {
      toast.error("Logout failed. Please try again.");

      setUser(null);
    }
  }

  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route
          path="/login"
          element={
            user ? (
              <Navigate to="/bugs" replace />
            ) : (
              <Login
                userauthlogin={userauthlogin}
                setUser={setUser}
                user={user}
              />
            )
          }
        />
        <Route
          path="/register"
          element={<Register userauth={userauth} user={user} />}
        />
        <Route
          path="/logout"
          element={<Logout logout={logout} setUser={setUser} />}
        />

        <Route element={<Layout islogin={user} />}>
          <Route
            element={
              <Protectedroute
                islogin={user}
                setislogin={setUser}
                authfrontend={authfrontend}
              />
            }
          >
            <Route
              path="/"
              element={
                <Dashboard buglist={inputdata} removeBugs={removeBugs} />
              }
            />

            <Route
              path="/bugs"
              element={<Bugs buglist={inputdata} removeBugs={removeBugs} />}
            />
            <Route path="/add-a-bug" element={<Addabug onsubmit={addbugs} />} />

            <Route
              path="/bugs/:id"
              element={
                <Bug
                  buglist={inputdata}
                  onstatusupdate={editbugs}
                  removesol={removesol}
                />
              }
            />
            <Route
              path="/edit-bug/:editid"
              element={<Addabug inputdata={inputdata} onsubmit={editbugs} />}
            />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
