import { Link } from 'react-router-dom';
import { stations } from '../data/stations';

// Experiment 8 - Home view: what the Climate Stations application is and how to use it.
function Home() {
  const temps = stations.map((s) => s.initialTemp);
  const hottest = stations.find((s) => s.initialTemp === Math.max(...temps));
  const coolest = stations.find((s) => s.initialTemp === Math.min(...temps));
  const average = (temps.reduce((sum, t) => sum + t, 0) / temps.length).toFixed(1);

  return (
    <main className="lab-concept-panel">
      <h3>Welcome to the Climate Station Portal</h3>
      <p className="view-text">
        The Climate Stations application is the live front end of the Heatwave Intelligence System. It shows the
        current reading of {stations.length} Automatic Weather Stations (AWS) across India and turns every
        temperature into a heatwave alert level, so a rising temperature is noticed the moment it crosses a danger
        threshold.
      </p>
      <p className="view-text">
        Right now the grid averages <strong>{average}&deg;C</strong>. The hottest station is{' '}
        <strong>{hottest.location}</strong> at <strong>{hottest.initialTemp.toFixed(1)}&deg;C</strong> and the coolest
        is <strong>{coolest.location}</strong> at <strong>{coolest.initialTemp.toFixed(1)}&deg;C</strong>.
      </p>

      <div className="concept-grid">
        <div className="concept-card">
          <h4>Station cards</h4>
          <p>
            Each card shows one AWS: its temperature, relative humidity, elevation and the heatwave alert level
            (Normal, Yellow Watch, Orange Alert or Red Emergency). The card border changes colour with the alert.
          </p>
        </div>
        <div className="concept-card">
          <h4>Try the simulation</h4>
          <p>
            Press <code>Heat Surge</code> to add 0.5&deg;C or <code>Cool Down</code> to remove 0.5&deg;C and watch the
            alert level react. <code>Reset</code> restores one station, and <code>Reset All Stations</code> restores the
            whole grid.
          </p>
        </div>
        <div className="concept-card">
          <h4>Three views</h4>
          <p>
            <strong>Stations</strong> is the live grid, <strong>Home</strong> is this overview and <strong>About</strong>{' '}
            explains how the application is built. Switching views never reloads the page.
          </p>
        </div>
      </div>

      <Link to="/" className="view-link">Open the station grid &raquo;</Link>
    </main>
  );
}

export default Home;
