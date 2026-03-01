import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useNavigate, useParams } from "react-router-dom";

function Addabug({ inputdata = [], onsubmit }) {
  const navigate = useNavigate();

  const { editid } = useParams();
  const iseditid = Boolean(editid);

  const bugtoedit = iseditid
    ? inputdata.find((item) => item._id === editid)
    : null;

 
  
  const [title, settitle] = useState(() => bugtoedit?.title || "");
  const [description, setdescription] = useState(
    () => bugtoedit?.description || "",
  );
  const [priority, setpriority] = useState(() => bugtoedit?.priority || "low");

  function handleclick(e) {
    e.preventDefault();

    const newdata = {
      title,
      description,
      priority,
      status: bugtoedit?.status || "new",
      createdAt: bugtoedit?.createdAt || new Date().toISOString(),
      solution: {
        text: "",
      },
    };
    onsubmit(newdata, editid);
    settitle("");
    setdescription("");
    navigate("/");
  }

  return (
    <div className="max-w-xl mx-auto mt-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        {iseditid ? "Edit Bug" : "Report New Bug"}
      </h1>
      <form
        action=""
        onSubmit={handleclick}
        className="bg-white rounded-lg shadow-md p-6 space-y-4"
      >
        <div>
          <label className="block text-sm text-gray-600 mb-2">title</label>
          <Input
            type="text"
            value={title}
            onChange={(e) => settitle(e.target.value)}
            placeholder="Bug title"
            className="w-full"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">
            description
          </label>
          <Input
            type="text"
            value={description}
            onChange={(e) => setdescription(e.target.value)}
            placeholder="description"
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-2">Priority</label>
          <select
            name=""
            id=""
            value={priority}
            onChange={(e) => setpriority(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:rind-2 focus-ring-blue-500"
          >
            <option value="low">low</option>
            <option value="mid">mid</option>
            <option value="high">high</option>
          </select>
        </div>
        <div className="flex gap-4 mt-6"></div>
        <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700">
          {iseditid ? "Update" : "Add"}
        </Button>
        <Button
          type="button"
          className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700"
          onClick={() => navigate("/bugs")}
        >
          Cancel
        </Button>
      </form>
    </div>
  );
}

export default Addabug;
