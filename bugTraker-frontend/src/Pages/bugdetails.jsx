import { useNavigate, useParams } from "react-router-dom";
import Statuscolor from "../components/statuscolor";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import toast from "react-hot-toast";

function Bugdetails({ buglist = [], onstatusupdate, removesol }) {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const bug = buglist.find((item) => item._id === id);
  const [updatestatus, setupdatestatus] = useState("new");
  const [solution, setsolution] = useState("");

  useEffect(() => {
    if (bug) {
      setupdatestatus(bug.status);
      setsolution("");
    }
  }, [bug]);

  function handlestatusupdate() {
    onstatusupdate({ ...bug, status: updatestatus }, id);
    toast.success("Status Updated");
  }

  function solutionHandler() {
    if (!solution.trim()) return;
    onstatusupdate(
      {
        solution: {
          text: solution,
          createdAt: Date.now(),
          createdByname: "You",
        },
      },
      id,
    );
    setsolution("");
  }

  const priorityColor = {
    high: "bg-red-500",
    medium: "bg-yellow-500",
    low: "bg-green-500",
  };

  if (!bug) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow">
        <p className="text-gray-500">Bug not found</p>
        <Button onClick={() => navigate("/bugs")} className="mt-4">
          Back
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">{bug.title}</h1>

      <div className="bg-white rounded-2xl shadow p-6 grid grid-cols-1 md:grid-cols-5 gap-6">
        <div>
          <p className="text-gray-500 text-sm">Priority</p>
          <Badge
            className={`capitalize ${priorityColor[bug.priority.toLowerCase()] || "bg-gray-300"} mt-1`}
          >
            {bug.priority}
          </Badge>
        </div>
        <div>
          <p className="text-gray-500 text-sm">Status</p>
          <Statuscolor status={bug.status} />
        </div>
        <div>
          <p className="text-gray-500 text-sm">Reported By</p>
          <p className="mt-1 font-medium">{bug.createdByname || "Unknown"}</p>
        </div>
        {/* <div>
          <p className="text-gray-500 text-sm">Assigned To</p>
          <p className="mt-1 font-medium">{bug.assignedTo || "Unassigned"}</p>
        </div> */}
        <div>
          <p className="text-gray-500 text-sm">Created At</p>
          <p className="mt-1 font-medium">
            {new Date(bug.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Bug Description + Steps */}
      <div className="bg-white rounded-2xl shadow p-6 space-y-4">
        <h2 className="text-lg font-semibold">Description</h2>
        <p className="text-gray-700">
          {bug.description || "No description provided."}
        </p>

        {bug.steps?.length > 0 && (
          <>
            <h2 className="text-lg font-semibold">Steps to Reproduce</h2>
            <ol className="list-decimal list-inside text-gray-700 space-y-1">
              {bug.steps.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </>
        )}
      </div>

      <div className="bg-white rounded-2xl shadow p-6 flex flex-col md:flex-row md:items-center gap-4">
        <p className="text-gray-500 text-sm md:w-32">Update Status</p>
        <div className="flex gap-2 flex-1">
          <Select
            value={updatestatus}
            onValueChange={setupdatestatus}
            className="flex-1"
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
            </SelectContent>
          </Select>
          <Button size="sm" variant="secondary" onClick={handlestatusupdate}>
            Update
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow p-6 relative">
        <h2 className="text-lg font-semibold mb-4">Solutions</h2>
        <div className="relative pl-8">
          <div className="absolute top-0 left-3 h-full w-[2px] bg-gray-200" />
          {bug.solution?.map((sol) => (
            <div
              className="relative mb-6 last:mb-0"
              key={sol._id || sol.createdAt}
            >
              <span className="absolute left-[-11px] top-0 block h-4 w-4 rounded-full bg-blue-500 border-2 border-white" />
              <div className="ml-2 space-y-1">
                <p className="text-gray-800">{sol.text}</p>
                <div className="flex gap-2 text-xs text-gray-500 items-center">
                  <span>💬 {sol.createdByname}</span>
                  <span>{new Date(sol.createdAt).toLocaleString()}</span>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => removesol(id, sol._id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Solution */}
      <div className="bg-white rounded-2xl shadow p-6 space-y-2">
        <textarea
          placeholder="Add a solution..."
          value={solution}
          onChange={(e) => setsolution(e.target.value)}
          className="w-full border rounded p-2"
        />
        <Button onClick={solutionHandler} variant="default">
          Add Solution
        </Button>
      </div>
    </div>
  );
}

export default Bugdetails;
