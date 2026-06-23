import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Users from './components/Users';
import Teams from './components/Teams';
import Activities from './components/Activities';
import Workouts from './components/Workouts';
import Leaderboard from './components/Leaderboard';

function App() {
  const codespaceNameEnv = process.env.REACT_APP_CODESPACE_NAME || 'localhost';
  let backendUrl;
  
  if (codespaceNameEnv === 'localhost') {
    backendUrl = 'http://localhost:8000';
  } else {
    backendUrl = `https://${codespaceNameEnv}-8000.app.github.dev`;
  }

  console.log('OctoFit Tracker App initialized');
  console.log('Backend URL:', backendUrl);
  console.log('REACT_APP_CODESPACE_NAME:', codespaceNameEnv);

  return (
    <Router>
      <div className="App">
        {/* Navigation Bar */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              <img src="/octofit-logo.svg" alt="OctoFit Tracker" />
              OctoFit Tracker
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/users">
                    👥 Users
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/teams">
                    🏢 Teams
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/activities">
                    🏃 Activities
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/workouts">
                    💪 Workouts
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/leaderboard">
                    🏆 Leaderboard
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="main-content">
          <Routes>
            <Route
              path="/"
              element={
                <div className="container mt-5">
                  <div className="row">
                    <div className="col-md-8 mx-auto">
                      <div className="card">
                        <div className="card-body">
                          <h1 className="card-title">Welcome to OctoFit Tracker 🐙</h1>
                          <p className="card-text">
                            Track your fitness activities, build teams, and compete on the leaderboard!
                          </p>
                          <p className="text-muted">
                            <strong>Backend URL:</strong> {backendUrl}
                          </p>
                          <p className="text-muted">
                            <strong>Codespace Name:</strong> {codespaceNameEnv}
                          </p>
                          <div className="alert alert-info">
                            <strong>Info:</strong> Use the navigation menu above to view Users, Teams, Activities,
                            Workouts, and the Leaderboard. Check the browser console (F12) for API debugging
                            information.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              }
            />
            <Route path="/users" element={<Users />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Routes>
        </div>

        {/* Footer */}
        <footer className="bg-dark text-white text-center py-4 mt-5">
          <p>&copy; 2026 OctoFit Tracker. All rights reserved.</p>
          <p className="text-muted small">API Backend: {backendUrl}/api/</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
