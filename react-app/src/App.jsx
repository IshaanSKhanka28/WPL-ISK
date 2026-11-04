import { useState } from 'react';
import { Navigate, NavLink, Route, Routes, useLocation } from 'react-router-dom';
import { NAV_LINKS } from '../../js/nav-links.js';
import Home from './pages/Home';
import Stations from './pages/Stations';
import About from './pages/About';
import { stations } from './data/stations';
import './App.css';

// Experiment 8: the application shell (header + navigation) stays on screen,
// <Routes> swaps the view below it without a page reload.
// "/" opens on the station grid; Home and About are separate views.
function App() {
  const [resetCount, setResetCount] = useState(0);   // changing the key remounts the cards, resetting their state
  const { pathname } = useLocation();

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-badge-row">
          <span className="badge-pill">Autonomous Telemetry Grid</span>
          <span className="badge-pill badge-outline">Heatwave Intelligence</span>
        </div>
        <h1 className="header-title">Climate Intelligence &amp; Heatwave Early Warning System</h1>

        <div className="header-action-bar">
          <div className="status-indicator">
            <span className="pulse-dot"></span>
            <span>Live Telemetry Grid &bull; {stations.length} Monitoring Stations Active</span>
          </div>
          {pathname === '/' && (
            <button type="button" className="btn-header-reset" onClick={() => setResetCount((n) => n + 1)}>
              &#8635; Reset All Stations to Baseline
            </button>
          )}
        </div>

        {/* Portal navigation: the static pages of Experiments 1-6 */}
        <nav className="navbar-container">
          <ul className="portal-nav-list">
            {NAV_LINKS.map(({ id, label, href }) => (
              <li key={id}>
                <a href={`/${href}`} className={id === 'react-app' ? 'active' : undefined}>{label}</a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Application navigation: client-side routes (Experiment 8) */}
        <nav className="navbar-container">
          <ul className="portal-nav-list">
            <li><NavLink to="/" end>Stations</NavLink></li>
            <li><NavLink to="/home">Home</NavLink></li>
            <li><NavLink to="/about">About</NavLink></li>
          </ul>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Stations key={resetCount} />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
