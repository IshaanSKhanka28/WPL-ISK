// Experiment 5 / Task 1 - Heatwave temperature analysis (heatwave_analysis)
// Variables, operators, expressions, and the three message-printing methods:
// alert(), console.log() and document.write().
import { $, num, text, signed, setBadge, logBlock, field, statCard, resultCard, expectedOutput } from '../ui.js';

export function mount(root) {
    root.innerHTML = `
        <div class="field-grid">
            ${field('t1-location', 'Location Name:', 'text', 'Mumbai', 'placeholder="e.g. Mumbai"')}
            ${field('t1-date', 'Monitoring Date:', 'date', '2026-07-15')}
            ${field('t1-temp', 'Current Temperature (°C):', 'number', 39, 'step="0.5"')}
            ${field('t1-threshold', 'Heatwave Threshold (°C):', 'number', 37, 'step="0.5"')}
            ${field('t1-humidity', 'Relative Humidity (%):', 'number', 65, 'min="0" max="100"')}
        </div>
        <div class="btn-group">
            <button type="button" class="btn-primary" id="t1-run">Run Temperature Analysis</button>
            <button type="button" class="btn-secondary" id="t1-alert">Trigger alert()</button>
            <button type="button" class="btn-secondary" id="t1-console">Trigger console.log()</button>
            <button type="button" class="btn-secondary" id="t1-write">Demo document.write()</button>
        </div>
        ${resultCard('Analysis Results', 't1-badge',
            statCard('Location', 't1-res-loc', 'sm') + statCard('Current Temp', 't1-res-temp') +
            statCard('Threshold Temp', 't1-res-threshold') + statCard('Temperature Difference', 't1-res-diff'),
            '<div class="status-line"><p><strong>Status: </strong><span id="t1-status"></span></p></div>')}
        ${expectedOutput('Standard Expected Output (Mumbai):',
            'Location: Mumbai | Current Temp: 39°C | Threshold: 37°C | Diff: 2°C | Status: Heatwave Condition Detected')}
        <div class="sandbox" id="t1-sandbox">
            <h4>document.write() Output Sandbox:</h4>
            <iframe id="t1-frame" title="document.write output"></iframe>
        </div>`;

    let reading;   // last analysed values, reused by the alert / document.write buttons

    function analyse() {
        reading = {
            location: $('t1-location').value.trim() || 'Mumbai',
            temp: num('t1-temp'),
            threshold: num('t1-threshold'),
        };
        const { location, temp, threshold } = reading;
        const diff = temp - threshold;
        const heatwave = temp >= threshold;

        text('t1-res-loc', location);
        text('t1-res-temp', `${temp}°C`);
        text('t1-res-threshold', `${threshold}°C`);
        text('t1-res-diff', `${signed(diff)}°C`);
        setBadge('t1-badge', heatwave ? 'badge-severe' : 'badge-normal',
            heatwave ? 'Heatwave Condition Detected' : 'Normal Condition');
        $('t1-status').style.color = heatwave ? '#c62828' : '#2e7d32';
        text('t1-status', heatwave
            ? `Heatwave Condition Detected (Temperature has crossed the threshold by ${diff.toFixed(1)}°C)`
            : `Normal Temperature (${Math.abs(diff).toFixed(1)}°C below threshold)`);

        logBlock('Module 1: Real-Time Temperature Variance Analysis', [
            `Location: ${location}`, `Current Temperature: ${temp}°C`, `Heatwave Threshold: ${threshold}°C`,
            `Temperature Difference: ${diff}°C`, `Status: ${heatwave ? 'Heatwave Condition Detected' : 'Normal'}`,
        ]);
    }

    const statusOf = () => (reading.temp >= reading.threshold ? 'Heatwave Condition Detected' : 'Normal');

    $('t1-run').addEventListener('click', analyse);

    $('t1-alert').addEventListener('click', () => {
        const { location, temp, threshold } = reading;
        alert(`--- Heatwave Monitoring System ---\nLocation: ${location}\nCurrent Temperature: ${temp}°C\n` +
            `Heatwave Threshold: ${threshold}°C\nTemperature Difference: ${signed(temp - threshold)}°C\nStatus: ${statusOf()}`);
    });

    $('t1-console').addEventListener('click', () => {
        analyse();
        alert('Console output generated! Open Developer Tools (F12 -> Console) to inspect.');
    });

    $('t1-write').addEventListener('click', () => {
        const { location, temp, threshold } = reading;
        $('t1-sandbox').style.display = 'block';
        const doc = $('t1-frame').contentWindow.document;
        doc.open();
        doc.write('<!DOCTYPE html><html><head><style>body{font-family: Arial; padding: 8px; color: #333;} h4{color:#d84315; margin:0 0 5px 0;}</style></head><body>');
        doc.write('<h4>document.write() Render Output:</h4>');
        doc.write(`<p style="margin:2px 0;"><strong>Location:</strong> ${location} | <strong>Current:</strong> ${temp}&deg;C | <strong>Threshold:</strong> ${threshold}&deg;C</p>`);
        doc.write(`<p style="margin:2px 0;"><strong>Status:</strong> <span style="color:red; font-weight:bold;">${statusOf()}</span> (Diff: ${(temp - threshold).toFixed(1)}&deg;C)</p>`);
        doc.write('</body></html>');
        doc.close();
    });

    analyse();
}
