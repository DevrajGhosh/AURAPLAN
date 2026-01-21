import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import TodoList from "./TodoList";
import Calendar from "./Calendar";

/* =====================
   BACKEND URL
====================== */
const BASE_URL = "https://auraplan.onrender.com";

function App() {
  /* =====================
     AUTH STATES
  ====================== */
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, setUser] = useState(null);

  /* =====================
     UI STATES
  ====================== */
  const [isSignup, setIsSignup] = useState(false);
  const [flash, setFlash] = useState("");

  /* =====================
     QUOTES
  ====================== */
  const quotes = [
    "Small steps every day 🌱",
    "You are doing better than you think 💫",
    "Focus on progress, not perfection ✨",
    "Your future self will thank you 💙",
    "Consistency beats motivation 🌸",
    "Healing is also productivity 🌿"
  ];

  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const [imgSeed] = useState(Math.random());

  /* =====================
     AUTH HANDLERS
  ====================== */

  const handleLogin = async () => {
    if (!email || !password) {
      setFlash("Please enter email and password");
      setTimeout(() => setFlash(""), 3000);
      return;
    }

    try {
      const res = await axios.post(`${BASE_URL}/api/auth/login`, {
        email,
        password
      });

      setUser(res.data);
      setFlash("");
    } catch (err) {
      setFlash("Login failed. Check credentials.");
      setTimeout(() => setFlash(""), 3000);
    }
  };

  const handleSignup = async () => {
    if (!name || !email || !password) {
      setFlash("All fields are required");
      setTimeout(() => setFlash(""), 3000);
      return;
    }

    try {
      await axios.post(`${BASE_URL}/api/auth/signup`, {
        name,
        email,
        password
      });

      setFlash("Signup successful! Please login.");
      setIsSignup(false);
      setTimeout(() => setFlash(""), 3000);
    } catch (err) {
      setFlash("Signup failed. Email may already exist.");
      setTimeout(() => setFlash(""), 3000);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setEmail("");
    setPassword("");
    setName("");
    setFlash("");
  };

  /* =====================
     UI
  ====================== */

  return (
    <div className="layout">
      {/* HEADER */}
      <header className="header">
        <h2 className="logo">AuraPlan 🌸</h2>

        {!user ? (
          <div className="signin-box">
            {isSignup && (
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            )}

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button onClick={isSignup ? handleSignup : handleLogin}>
              {isSignup ? "Sign Up" : "Sign In"}
            </button>

            {flash && <p className="flash-error">{flash}</p>}

            <p
              className="toggle-auth"
              onClick={() => setIsSignup(!isSignup)}
              style={{ cursor: "pointer" }}
            >
              {isSignup
                ? "Already have an account? Sign in"
                : "New here? Create account"}
            </p>
          </div>
        ) : (
          <div className="welcome-text">
            Welcome, <strong>{user.name}</strong> 🌿
            <button onClick={handleLogout} style={{ marginLeft: "10px" }}>
              Logout
            </button>
          </div>
        )}
      </header>

      {/* MAIN CONTENT */}
      <div className="content">
        {/* LEFT */}
        <aside className="left">
          <div className="image-stack">
            <img
              src={`https://picsum.photos/300/200?random=${imgSeed}`}
              alt="motivation"
              className="side-img fade"
            />
            <img
              src={`https://picsum.photos/300/200?random=${imgSeed + 1}`}
              alt="study"
              className="side-img fade"
            />
          </div>

          <div className="stories">
            <h3>Motivational Story</h3>
            <p>
              <strong>APJ Abdul Kalam:</strong> Failed multiple times, lived
              humbly, and became the President of India.
            </p>
          </div>
        </aside>

        {/* CENTER */}
        <main className="center">
          <h1>Stay Consistent 🌿</h1>
          <h3 className="quote fade">{quotes[quoteIndex]}</h3>

          {user ? (
            <TodoList userId={user.userId} />
          ) : (
            <p className="signin-hint">
              Sign in to view and manage your tasks ✨
            </p>
          )}
        </main>

        {/* RIGHT */}
        <aside className="right">
          <Calendar />
        </aside>
      </div>

      {/* FOOTER */}
      <footer className="footer">
        © 2025 AuraPlan. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
