import { Link } from "react-router-dom";

function Navbar({ islogin }) {
  return (
    <nav className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shadow-sm">
      {/* Logo / Brand */}
      <h1 className="text-xl font-bold text-gray-900 hover:text-indigo-600 transition-colors">
        Bug Tracker
      </h1>

      {/* Menu */}
      <div className="flex items-center gap-4">
        {islogin ? (
          <>
            <span className="text-sm text-gray-700">{islogin.name}</span>
            <Link to="/logout">
              <button className="px-3 py-1 text-sm font-medium text-red-600 border border-red-600 rounded hover:bg-red-50 transition">
                Logout
              </button>
            </Link>
          </>
        ) : (
          <>
            <Link to="/login">
              <button className="px-3 py-1 text-sm font-medium text-indigo-600 border border-indigo-600 rounded hover:bg-indigo-50 transition">
                Login
              </button>
            </Link>
            <Link to="/register">
              <button className="px-3 py-1 text-sm font-medium text-green-600 border border-green-600 rounded hover:bg-green-50 transition">
                Sign Up
              </button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;