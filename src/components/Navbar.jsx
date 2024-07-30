import React from "react";
import IOL from "../assets/logo.webp";
import { useRecoilValue, useSetRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const setUser = useSetRecoilState(userAtom);
  const currentUser = useRecoilValue(userAtom); //logged in user
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await fetch("https://iocl-project-backend.vercel.app/api/users/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      console.log(data);
      if (data.error) {
        alert("Error: " + data.error);
      }
      localStorage.removeItem("user-tender");
      setUser(null);
      navigate("/auth");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-20 font-teko bg-white shadow-md">
      <div className="w-full h-full flex items-center justify-between px-4 md:px-8">
        <div className="flex items-center justify-center">
          <img className="w-20 h-auto md:w-28 cursor-pointer" onClick={() => {navigate("/")}} src={IOL} alt="Logo" />
        </div>
        <div className="flex-1 text-center">
          <h1 className="text-xl md:text-2xl lg:text-[2.5rem] font-bold">
            TENDER DOCUMENT MANAGEMENT SYSTEM
          </h1>
        </div>
        <div className="flex items-center justify-center gap-3 md:gap-5 text-[0.9rem] md:text-[1.2rem]">
          <h5 className="hidden sm:block">{currentUser.name}</h5>
          <button
            onClick={handleLogout}
            className="bg-orange-500 text-white rounded-md px-2 py-1 md:px-3 md:py-1"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
