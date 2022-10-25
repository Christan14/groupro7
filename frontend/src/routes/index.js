import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Profil from "../pages/Profil";
import Profils from "../pages/Profils";
import UpdateProfil from "../pages/UpdateProfil";
import UpdatePost from "../pages/UpdatePost";
import Errors from "../pages/404";

const index = () => {
  return (
    <Routes>
      <Route  path="/" exact element={<Register />} />
      <Route path="/register" element={<Register/>} />
      <Route path="/login" element={<Login />} />
      <Route path="/profil" element={<Profil />} />
      <Route path="/profils" element={<Profils />} />
      <Route path="/home" element={<Home />} />
      <Route path="/updateProfil/:idUser" element={<UpdateProfil />} />
      <Route path="/updatePost/:idPost" element={<UpdatePost />} />
      <Route path="/*" element={<Errors />} />
    </Routes>
  );
};

export default index;
