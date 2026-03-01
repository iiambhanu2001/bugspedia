import React from "react";

function statuscolor({ status }) {
  const bgColor = {
    new: "bg-red-100 text-red-600",
    "in-progress": "bg-yellow-100 text-yellow-600",
    resolved: "bg-green-100 text-green-600",
  };
  return (
    <div
      className={`px-2 py-1 rounded text-xs font-medium ${bgColor[status] || "bg-gray-100 text-gray-800"}`}
      style={{
        backgroundColor: bgColor,
        padding: "10px",
        marginBottom: "8px",
        borderRadius: "6px",
        border: "1px solid #ccc",
      }}
    >
      {status}
    </div>
  );
}

export default statuscolor;
