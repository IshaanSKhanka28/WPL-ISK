import { Link } from 'react-router-dom';

// Experiment 8 - About view: purpose, features and how the application is built.
function About() {
  return (
    <main className="lab-concept-panel">
      <h3>About the Application</h3>
      <p className="view-text">
        The Climate Station Portal is the React front end of the Heatwave Intelligence System, a climate
        intelligence project for heatwave monitoring, prediction and early warning. Meteorologists, disaster-management
        officers and citizens need to see quickly which locations are getting dangerously hot. This application puts
        the Automatic Weather Station (AWS) readings in one place and shows the alert level for each of them.
      </p>

      <h3>What it does</h3>
      <div className="concept-grid">
        <div className="concept-card">
          <h4>Live station grid</h4>
          <p>One card per AWS with temperature, humidity, elevation, region and the current alert level.</p>
        </div>
        <div className="concept-card">
          <h4>Alert levels</h4>
          <p>Normal below 40&deg;C, Yellow Watch from 40&deg;C, Orange Alert from 43&deg;C and Red Emergency from 45&deg;C.</p>
        </div>
        <div className="concept-card">
          <h4>Heat simulation</h4>
          <p>Heat Surge and Cool Down change a reading by 0.5&deg;C to show how an alert escalates or clears. Reset returns to the baseline.</p>
        </div>
      </div>

      <h3>How it is built</h3>
      <div className="concept-grid">
        <div className="concept-card">
          <h4>Experiment 7 - components</h4>
          <p>
            <code>WeatherStation</code> is a reusable functional component. It receives the station data through
            <code> props</code>, keeps the changing temperature and event count in <code>useState()</code>, and handles
            the button clicks with <code>onClick</code> event handlers.
          </p>
        </div>
        <div className="concept-card">
          <h4>Experiment 8 - single page app</h4>
          <p>
            <code>BrowserRouter</code>, <code>Routes</code> and <code>Route</code> map the URL to the Stations, Home and
            About views, and <code>Link</code> / <code>NavLink</code> move between them without a page reload.
          </p>
        </div>
        <div className="concept-card">
          <h4>Data and lists</h4>
          <p>
            The stations live in a JavaScript array in <code>data/stations.js</code>. The Stations view turns it into
            cards with <code>map()</code>, giving every card a unique <code>key</code>.
          </p>
        </div>
        <div className="concept-card">
          <h4>Tools</h4>
          <p>React, React Router and Vite for the development server and the production build.</p>
        </div>
        <div className="concept-card">
          <h4>Part of the portal</h4>
          <p>
            The top menu links back to the HTML, CSS, JavaScript and jQuery pages built in Experiments 1 to 6, so the
            whole project works as one website.
          </p>
        </div>
      </div>

      <p className="view-text">
        <Link to="/" className="view-link">View the live stations &raquo;</Link>
      </p>

      <p className="footer-credits">Heatwave Intelligence System &copy; 2026 &bull; Web Development Laboratory</p>
    </main>
  );
}

export default About;
