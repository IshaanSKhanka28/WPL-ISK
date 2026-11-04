// Single source of truth for the portal navigation bar.
// Used by every static page (js/site.js) and by the React app (react-app/src/App.jsx).
// heatwave-form.html (Experiment 4) is kept in the code base but not linked: climate-alert.html serves the same purpose.
export const NAV_LINKS = [
    { id: 'index',              label: 'Home',              href: 'index.html' },
    { id: 'about-system',       label: 'About System',      href: 'about-system.html' },
    { id: 'alert-details',      label: 'Alert Details',     href: 'alert-details.html' },
    { id: 'forecast',           label: 'Forecast Results',  href: 'forecast.html' },
    { id: 'hotspot-map',        label: 'Hotspot Map',       href: 'hotspot-map.html' },
    { id: 'sources',            label: 'Data Sources',      href: 'sources.html' },
    { id: 'subscribe',          label: 'Subscribe',         href: 'subscribe.html' },
    { id: 'media',              label: 'Media Center',      href: 'media.html' },
    { id: 'climate-alert',      label: 'Climate Alert',     href: 'climate-alert.html' },
    { id: 'intelligence-suite', label: 'Intelligence Suite', href: 'intelligence-suite.html' },
    { id: 'react-app',          label: 'Climate Stations',  href: 'react-app/' },
    { id: 'navigation',         label: 'Navigation Menu',   href: 'navigation.html' },
];
