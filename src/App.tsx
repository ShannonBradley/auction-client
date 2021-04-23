import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";


import Auth from "./auth/Auth";
import Login from "./auth/Login";
import Signup from "./auth/Signup"


function App() {
  const [sessionToken, setSessionToken] = useState("");

  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setSessionToken(localStorage.getItem("token"));
    }
  }, []);

  const updateToken = (newToken) => {
    localStorage.setItem("token", newToken);
    setSessionToken(newToken);
  };

  const clearToken = () => {
    localStorage.clear();
    setSessionToken("");
  };

  useEffect(() => {
    if (localStorage.getItem("username")) {
      setUsername(localStorage.getItem("username"));
    }
  }, []);

  const getUsername = (username) => {
    localStorage.setItem("username", username);
    setUsername(username);
  };

  /// trying to pass id

  useEffect(() => {
    if (localStorage.getItem("userId")) {
      setUserId(localStorage.getItem("userId"));
    }
  }, []);

  const setId = (id) => {
    localStorage.setItem("userId", id);
    setUserId(id);
  };

  const protectedViews = () => {
    return sessionToken === localStorage.getItem("token") ? (
      <MainPage token={sessionToken} userId={userId} username={username} />
    ) : (
      <Auth updateToken={updateToken} setId={setId} getUsername={getUsername} />
    );
  };

  return (
    <div className="container">
      <Header />
      <Router>
        <Sitebar clearToken={clearToken} token={sessionToken} />
      </Router>
      {protectedViews()}
      <Footer />
    </div>
  );
}
export default App;