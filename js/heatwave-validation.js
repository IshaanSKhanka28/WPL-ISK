// Experiment 4 / Tasks 2-5 - JavaScript validation for the monitoring form in heatwave-form.html (Task 1).
// Each rule gets the trimmed field value and returns an error message, or '' when the value is valid.
import { PATTERNS } from './validators.js';

const required = (label, then) => (v) => (v === '' ? `${label} is required.` : then(v));
const outOfRange = (min, max) => (v) => isNaN(Number(v)) || Number(v) < min || Number(v) > max;

const RULES = {
    // Task 2 - name and AWS station ID
    observerName: required('Observer name', (v) =>
        /^[A-Za-z ]{3,}$/.test(v) ? '' : 'Name must contain alphabets and spaces only, with at least 3 characters.'),
    awsStationId: required('AWS Station ID', (v) =>
        PATTERNS.awsStationId.test(v) ? '' : 'AWS Station ID must follow the format AWS001.'),
    // Task 3 - email and mobile number
    email: required('Email', (v) => (PATTERNS.email.test(v) ? '' : 'Please enter a valid email address.')),
    mobile: required('Mobile number', (v) =>
        PATTERNS.digits10.test(v) ? '' : 'Mobile number must contain exactly 10 digits.'),
    // Task 4 - weather observation data
    location: required('Location', () => ''),
    observationDate: required('Observation date', () => ''),
    temperature: required('Temperature', (v) =>
        outOfRange(0, 60)(v) ? 'Temperature should be between 0°C and 60°C.' : ''),
    humidity: required('Humidity', (v) =>
        outOfRange(0, 100)(v) ? 'Humidity must be between 0% and 100%.' : ''),
    // Task 5 - alert level
    alertLevel: (v) => (v === '' ? 'Please select a heatwave alert level.' : ''),
};

const form = document.getElementById('heatwaveForm');
const successMessage = document.getElementById('formSuccess');

function validate(id) {
    const message = RULES[id](document.getElementById(id).value.trim());
    document.getElementById(`${id}Error`).textContent = message;
    return !message;
}

Object.keys(RULES).forEach((id) => {
    const event = id === 'alertLevel' ? 'change' : 'blur';
    document.getElementById(id).addEventListener(event, () => validate(id));
});

// Task 5 - show the success message only when every rule passes.
form.addEventListener('submit', (event) => {
    event.preventDefault();
    successMessage.hidden = !Object.keys(RULES).map(validate).every(Boolean);
});

form.addEventListener('reset', () => setTimeout(() => {
    Object.keys(RULES).forEach((id) => { document.getElementById(`${id}Error`).textContent = ''; });
    successMessage.hidden = true;
}, 0));
