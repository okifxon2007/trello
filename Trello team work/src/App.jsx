import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Trello from "../src/pages/Trello/Trello";
import MainLayout from "./layouts/MainLayout";
import Profile from "./pages/Profile/Profile";
import Files from "./pages/files/Files";
import HeadSection from "./components/HeadSection/HeadSection";
import "./App.css";
import Board from "./pages/Board/Board";
import SignIn from "./pages/Login/SignIn";
import SignUp from "./pages/SignUp/SignUp";
function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();

  return (
    <div>
      <Routes>
        {token && (
          <>
            <Route
              path="/"
              element={
                <MainLayout>
                  <Trello></Trello>
                </MainLayout>
              }
            ></Route>
            <Route
              path="/profile"
              element={
                <MainLayout>
                  <Profile></Profile>
                </MainLayout>
              }
            ></Route>
            <Route
              path="/files"
              element={
                <MainLayout>
                  <Files></Files>
                </MainLayout>
              }
            ></Route>

            <Route
              path="/board"
              element={
                <MainLayout>
                  <Board></Board>
                </MainLayout>
              }
            ></Route>

            <Route
              path="*"
              element={
                <MainLayout>
                  <h1>Error page</h1>
                </MainLayout>
              }
            ></Route>
          </>
        )}
        <Route path="/signin" element={<SignIn></SignIn>}></Route>
        <Route path="/signup" element={<SignUp></SignUp>}></Route>
        <Route path="*" element={<SignIn></SignIn>}></Route>
      </Routes>
    </div>
  );
}

export default App;
