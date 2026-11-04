// Experiment 5 / Task 3 - JavaScript object for climate monitoring (climate_object)
// Object literal with properties and methods that use the `this` keyword.
import { $, text, setBadge, field, statCard, resultCard, logBlock } from '../ui.js';

const climateData = {
    location: 'Mumbai',
    city: 'Mumbai Central',
    temperature: 39,
    humidity: 65,
    windSpeed: 12,
    forecastTemperature: 41,
    riskLevel: 'High',
    alertStatus: 'Active',
    monitoringDate: '2026-07-15',

    displayData() {
        logBlock('climateData.displayData() Execution', [
            `Location: ${this.location}`, `City: ${this.city}`, `Temperature: ${this.temperature}°C`,
            `Humidity: ${this.humidity}%`, `Wind Speed: ${this.windSpeed} km/h`,
            `Forecast Temp: ${this.forecastTemperature}°C`, `Risk Level: ${this.riskLevel}`,
            `Alert Status: ${this.alertStatus}`,
        ]);
        return `Location: ${this.location} (${this.city}) | Temp: ${this.temperature}°C | Humidity: ${this.humidity}% | ` +
            `Wind: ${this.windSpeed}km/h | Risk: ${this.riskLevel} | Status: ${this.alertStatus}`;
    },

    calcThresholdDiff(threshold = 37) {
        return this.temperature - threshold;
    },

    determineRisk() {
        if (this.temperature >= 40) this.riskLevel = 'Severe';
        else if (this.temperature >= 38 && this.humidity >= 60) this.riskLevel = 'High';
        else if (this.temperature >= 35) this.riskLevel = 'Moderate';
        else this.riskLevel = 'Normal';
        return this.riskLevel;
    },

    getWarningStatus() {
        if (this.alertStatus === 'Active' && (this.riskLevel === 'High' || this.riskLevel === 'Severe')) {
            return `URGENT ADVISORY: ${this.riskLevel} Heatwave active in ${this.location}. Emergency action initiated.`;
        }
        if (this.forecastTemperature >= 40) {
            return `EARLY WARNING: Impending heat surge for ${this.location} (Forecast: ${this.forecastTemperature}°C).`;
        }
        return `STANDARD ADVISORY: Routine environmental monitoring for ${this.location}.`;
    },

    updateAlertStatus(newStatus) {
        this.alertStatus = newStatus;
        return `Alert status updated to: '${this.alertStatus}'`;
    },
};

const NEXT_STATUS = { Active: 'Standby', Standby: 'Resolved', Resolved: 'Active' };

export function mount(root) {
    const tiles = [
        ['Location (Station)', 'loc', 'sm'], ['Temperature', 'temp'], ['Humidity', 'hum'],
        ['Wind Speed', 'wind'], ['Forecast Temp', 'forecast'], ['Risk Level', 'risk', 'sm'],
    ].map(([label, id, cls]) => statCard(label, `t3-${id}`, cls)).join('');

    root.innerHTML = `
        ${resultCard('Station Status', 't3-badge', tiles,
            `<div class="method-output"><p><strong>Early-Warning Status: </strong><span id="t3-warning"></span></p></div>`)}
        <div class="task-box-amber">
            <h4>Station Actions:</h4>
            <div class="btn-group">
                <button type="button" class="btn-primary" id="t3-display">Show Station Details</button>
                <button type="button" class="btn-secondary" id="t3-diff">Check Temperature vs Threshold</button>
                <button type="button" class="btn-secondary" id="t3-calc-risk">Calculate Heatwave Risk</button>
                <button type="button" class="btn-secondary" id="t3-status">Change Alert Status</button>
            </div>
            <div class="action-result" id="t3-result">Click a button above to see its result here.</div>
            <h4 class="sub">Update Station Readings:</h4>
            <div class="field-grid auto">
                ${field('t3-in-loc', 'Location:', 'text', 'Mumbai')}
                ${field('t3-in-temp', 'Temp (°C):', 'number', 39)}
                ${field('t3-in-hum', 'Humidity (%):', 'number', 65)}
                ${field('t3-in-forecast', 'Forecast (°C):', 'number', 41)}
            </div>
            <button type="button" class="btn-primary apply" id="t3-apply">Apply Changes</button>
        </div>`;

    function refresh() {
        const d = climateData;
        text('t3-loc', `${d.location} (${d.city})`);
        text('t3-temp', `${d.temperature}°C`);
        text('t3-hum', `${d.humidity}%`);
        text('t3-wind', `${d.windSpeed} km/h`);
        text('t3-forecast', `${d.forecastTemperature}°C`);
        text('t3-risk', d.riskLevel);
        text('t3-warning', d.getWarningStatus());
        if (d.alertStatus === 'Active') {
            setBadge('t3-badge', d.riskLevel === 'Severe' ? 'badge-severe' : 'badge-high', `${d.riskLevel.toUpperCase()} ALERT ACTIVE`);
        } else {
            setBadge('t3-badge', 'badge-normal', d.alertStatus.toUpperCase());
        }
    }

    // Every button prints its result in the "action result" box under the buttons.
    const showResult = (title, message) => {
        $('t3-result').innerHTML = `<strong>${title}</strong><br>${message}`;
    };

    $('t3-display').addEventListener('click', () => showResult('Station Details', climateData.displayData()));

    $('t3-diff').addEventListener('click', () => {
        const diff = climateData.calcThresholdDiff(37);
        showResult('Temperature vs 37°C Threshold',
            `Difference: ${diff >= 0 ? '+' : ''}${diff.toFixed(1)}°C (${diff >= 0 ? 'above' : 'below'} the threshold)`);
    });

    $('t3-calc-risk').addEventListener('click', () => {
        const risk = climateData.determineRisk();
        refresh();
        showResult('Heatwave Risk', `Calculated risk level is '${risk}' (${climateData.temperature}°C, ${climateData.humidity}% humidity)`);
    });

    $('t3-status').addEventListener('click', () => {
        const message = climateData.updateAlertStatus(NEXT_STATUS[climateData.alertStatus]);
        refresh();
        showResult('Alert Status', message);
    });

    $('t3-apply').addEventListener('click', () => {
        climateData.location = $('t3-in-loc').value.trim() || 'Mumbai';
        climateData.temperature = parseFloat($('t3-in-temp').value) || 0;
        climateData.humidity = parseFloat($('t3-in-hum').value) || 0;
        climateData.forecastTemperature = parseFloat($('t3-in-forecast').value) || 0;
        climateData.determineRisk();
        refresh();
        climateData.displayData();
        showResult('Station Updated',
            `Location: ${climateData.location} | Temp: ${climateData.temperature}°C | Risk Level: ${climateData.riskLevel}`);
    });

    refresh();
}
