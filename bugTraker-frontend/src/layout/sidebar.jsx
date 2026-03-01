import React from "react";
import { NavLink } from "react-router-dom";

function sidebar() {
  return (
    <aside className="w-56 bg-white border-r p-4">
      <nav className="space-y-2">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `block px-3 py-2 rounded ${isActive ? "bg-blue-100 text-blue-600" : "text-gray-700"}`
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/bugs"
          className={({ isActive }) =>
            `block px-3 py-2 rounded ${isActive ? "bg-blue-100 text-blue-600" : "text-gray-700"}`
          }
        >
          All Bugs
        </NavLink>
        <NavLink
          to="/add-a-bug"
          className={({ isActive }) =>
            `block px-3 py-2 rounded ${isActive ? "bg-blue-100 text-blue-600" : "text-gray-700"}`
          }
        >
          Add New Bug
        </NavLink>
      </nav>
    </aside>
  );
}

export default sidebar;
