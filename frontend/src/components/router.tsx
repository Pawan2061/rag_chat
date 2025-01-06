import { Route, Routes } from "react-router-dom";
import Home from "./landing";
import { Chat } from "./chat";
import NavBar from "./Navbar";

export const Router = () => {
  return (
    <>
      <NavBar />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </div>
    </>
  );
};
