import { useState, useEffect } from "react";
import "./App.css";
import { getLocalStorageKey } from "./utils/local-storage.service";
import ChatPage from "./Pages/Chat/Chat.page";
import LoginPage from "./Pages/Login/Login.Page";
import { Link, Navigate } from "react-router-dom";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const sessionId = getLocalStorageKey("session_id");
    console.log(sessionId);
    if (sessionId) {
      setIsLoggedIn(() => true);
    }
  }, []);
  return <div></div>;
}

export default App;
