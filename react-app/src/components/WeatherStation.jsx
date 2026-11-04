import { useState } from 'react';

// Experiment 7 - Component-based web application
//  1. Functional component      WeatherStation()
//  2. Props                     stationId, location, region, initialTemp, humidity, elevation
//  3. State (useState)          temperature, updateCount
//  4. Event handling (onClick)  heat surge, cool down, reset
//  5. Conditional rendering     alert level, card colour and disabled Reset button

// Alert levels, highest first - the first one the temperature reaches is used.
const ALERT_LEVELS = [
  { min: 45, level: 'Red Emergency', text: 'Extreme Heat Danger',       className: 'badge-red',    cardClass: 'card-border-red' },
  { min: 43, level: 'Orange Alert',  text: 'Severe Heatwave',           className: 'badge-orange', cardClass: 'card-border-orange' },
  { min: 40, level: 'Yellow Watch',  text: 'Moderate Heat Advisory',    className: 'badge-yellow', cardClass: 'card-border-yellow' },
  { min: -Infinity, level: 'Normal', text: 'Optimal / Safe Conditions', className: 'badge-normal', cardClass: 'card-border-normal' },
];

function WeatherStation({ stationId, location, region, initialTemp, humidity, elevation }) {
  const [temperature, setTemperature] = useState(initialTemp);
  const [updateCount, setUpdateCount] = useState(0);

  const alert = ALERT_LEVELS.find((a) => temperature >= a.min);

  // Change the temperature by `step` degrees and count the simulation event.
  const adjust = (step) => {
    setTemperature((prev) => +(prev + step).toFixed(1));
    setUpdateCount((prev) => prev + 1);
  };

  const reset = () => {
    setTemperature(initialTemp);
    setUpdateCount(0);
  };

  return (
    <div className={`station-card ${alert.cardClass}`}>
      <div className="station-card-header">
        <span className="station-id-badge">{stationId}</span>
        <span className="station-region">{region}</span>
      </div>

      <h3 className="station-location">{location}</h3>

      <div className="telemetry-display">
        <div className="temp-number-box">
          <span className="temp-value">{temperature.toFixed(1)}</span>
          <span className="temp-unit">&deg;C</span>
        </div>
        <div className="alert-badge-box">
          <span className={`alert-badge ${alert.className}`}>{alert.level}</span>
          <span className="alert-subtitle">{alert.text}</span>
        </div>
      </div>

      <div className="station-metrics">
        <div className="metric-item">
          <span className="metric-label">Relative Humidity</span>
          <span className="metric-value">{humidity}%</span>
        </div>
        <div className="metric-item">
          <span className="metric-label">Elevation</span>
          <span className="metric-value">{elevation}</span>
        </div>
        <div className="metric-item">
          <span className="metric-label">Simulations Run</span>
          <span className="metric-value">{updateCount} events</span>
        </div>
      </div>

      <div className="station-actions">
        <button type="button" className="btn-action btn-surge" onClick={() => adjust(0.5)} title="Simulate ambient heat increase">
          &#9650; Heat Surge (+0.5&deg;C)
        </button>
        <button type="button" className="btn-action btn-cool" onClick={() => adjust(-0.5)} title="Simulate cooling breeze">
          &#9660; Cool Down (-0.5&deg;C)
        </button>
        <button
          type="button"
          className="btn-action btn-reset"
          onClick={reset}
          title="Reset to initial props"
          disabled={temperature === initialTemp && updateCount === 0}
        >
          &#8635; Reset
        </button>
      </div>
    </div>
  );
}

export default WeatherStation;
