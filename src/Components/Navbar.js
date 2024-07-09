import React from "react";

function Navbar() {
  return (
    <>
      <nav className="flex justify-around bg-slate-900 text-white py-2">
        <div className="logo">
          <span className="font-blod text-xl mx-8 ">i Task</span>
        </div>
        <ul className="flex gap-8 mx-9">
          <li className="cursor-pointer hover:font-bold transition-all duration-50">
            Home
          </li>
          <li className="cursor-pointer hover:font-bold transition-all duration-50">
            Your Tasks
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
