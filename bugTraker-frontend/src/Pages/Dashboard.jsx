import React from "react";
import Bugslist from "./buglist";
import { useNavigate } from "react-router-dom";
import Statcard from "../components/statuscard";
import { Button } from "@/components/ui/button";

function Dashboard({ buglist = [] }) {
  const navigate = useNavigate();

  const total = buglist.length;
  const inprogress = buglist.filter(
    (item) => item.status === "in-progress",
  ).length;
  const newbugs = buglist.filter((item) => item.status === "new").length;
  const resolved = buglist.filter((item) => item.status === "resolved").length;
  const recentbugs = buglist.slice(-5).reverse();

  return (
    <div>
      <div className="p-6 max-w-7xl mx-auto space-y-8">
        
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        </div>
        <Button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          onClick={() => navigate("/add-a-bug")}
        >
          + Report a bug
        </Button>
        <div className="grid gap-6 sm:grid-cols-2 lg-grid-cols-4">
          <Statcard status="Total" value={total} color="text-gray-800" />
          <Statcard
            status="In-progress"
            value={inprogress}
            color="text-blue-800"
          />
          <Statcard status="New" value={newbugs} color="text-red-800" />
          <Statcard status="Resolved" value={resolved} color="text-green-800" />
        </div>
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Recent Bugs
          </h2>
       
   {recentbugs.length === 0 ? (
        <p className="text-gray-500 text-sm">No bugs yet</p>
      ) : (
        <div className="space-y-3">
          {recentbugs.map((bug) => (
            <div
              key={bug._id}
              onClick={() => navigate(`/bugs/${bug._id}`)}
              className="flex justify-between items-center p-4 rounded-lg border hover:bg-gray-50 cursor-pointer transition"
            >
              <div>
                <p className="font-medium text-gray-800">
                  {bug.title}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(bug.createdAt).toLocaleDateString()}
                </p>
              </div>

              <span
                className={`text-xs px-3 py-1 rounded-full font-medium ${
                  bug.status === "resolved"
                    ? "bg-green-100 text-green-600"
                    : bug.status === "in-progress"
                    ? "bg-blue-100 text-blue-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {bug.status}
              </span>
            </div>
          ))}
        </div>
      )}
      </div>
       </div>
    </div>
  );
}

export default Dashboard;
