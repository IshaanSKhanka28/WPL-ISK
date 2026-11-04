import WeatherStation from '../components/WeatherStation';
import { stations } from '../data/stations';

// Experiment 8: the station records come from a JavaScript array and are rendered with map().
// Each generated card needs a unique `key` so React can track it between renders.
function Stations() {
  return (
    <main className="stations-section">
      <div className="section-title-row">
        <h2>Regional Automated Weather Stations</h2>
        <span className="section-hint">Real-time Automatic Weather Station (AWS) grid with active telemetry.</span>
      </div>

      <div className="stations-grid">
        {stations.map((station) => (
          <WeatherStation
            key={station.id}
            stationId={station.id}
            location={station.location}
            region={station.region}
            initialTemp={station.initialTemp}
            humidity={station.humidity}
            elevation={station.elevation}
          />
        ))}
      </div>
    </main>
  );
}

export default Stations;
