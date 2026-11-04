// Experiment 5 / Task 4 - Analyse temperature readings using arrays (temperature_analysis)
// Array traversal, min / max / average, filter() and a live bar chart.
import { $, text, setBadge, logBlock, statCard, resultCard, expectedOutput } from '../ui.js';

const DEFAULT_READINGS = [34, 36, 38, 39, 41, 40, 37, 35, 39, 42];

// Bar colour class for one reading.
const heatClass = (t) => (t >= 40 ? 'severe-heat' : t >= 38 ? 'high-heat' : t >= 35 ? 'mod-heat' : 'normal-heat');

export function mount(root) {
    let readings = [...DEFAULT_READINGS];

    const tiles =
        statCard('Total Readings', 't4-count') + statCard('Minimum Temp', 't4-min', 'stat-cool') +
        statCard('Maximum Temp', 't4-max', 'stat-hot') + statCard('Average Temp', 't4-avg', 'stat-warm') +
        statCard('Readings &ge; 40°C', 't4-gte40', 'stat-danger');

    root.innerHTML = `
        <div class="code-line">let temperatureReadings = [<span id="t4-raw"></span>];</div>
        <div class="chart-container">
            <h4>Visual Temperature Distribution (°C)</h4>
            <div class="bar-chart" id="t4-chart"></div>
        </div>
        <div class="array-controls">
            <div class="grow">
                <label for="t4-new">Add Temperature Reading (°C):</label>
                <input type="number" id="t4-new" placeholder="e.g. 43" step="0.5">
            </div>
            <button type="button" class="btn-primary" id="t4-push">Push to Array</button>
            <button type="button" class="btn-secondary" id="t4-pop">Pop Reading</button>
            <button type="button" class="btn-secondary" id="t4-reset">Reset Default (10)</button>
        </div>
        ${resultCard('Array Analytics Results', 't4-badge', tiles,
            `<div class="status-line"><p><strong>High Heat / Heatwave Condition Readings (&ge; 40°C): </strong>
                <span id="t4-list" class="stat-hot"></span></p></div>`)}
        ${expectedOutput('Standard Expected Output (Writeup Specification):',
            'Temperature Readings: 34 36 38 39 41 40 37 35 39 42\nMinimum: 34°C | Maximum: 42°C | Average: 38.1°C | Readings ≥ 40°C: 3 | Heatwave Condition: 41, 40, 42')}`;

    function analyse() {
        if (readings.length === 0) return;

        const min = Math.min(...readings);
        const max = Math.max(...readings);
        const average = (readings.reduce((sum, t) => sum + t, 0) / readings.length).toFixed(1);
        const hot = readings.filter((t) => t >= 40);

        text('t4-raw', readings.join(', '));
        text('t4-count', readings.length);
        text('t4-min', `${min}°C`);
        text('t4-max', `${max}°C`);
        text('t4-avg', `${average}°C`);
        text('t4-gte40', hot.length);
        text('t4-list', hot.length ? hot.join(', ') : 'None');

        if (hot.length >= 3) setBadge('t4-badge', 'badge-severe', `${hot.length} Extreme Readings (≥40°C)`);
        else if (hot.length > 0) setBadge('t4-badge', 'badge-high', `${hot.length} High Heat Reading(s)`);
        else setBadge('t4-badge', 'badge-normal', 'Stable Baseline');

        $('t4-chart').innerHTML = readings.map((t, i) => `
            <div class="bar-col">
                <div class="bar-fill ${heatClass(t)}" style="height: ${Math.min(100, Math.max(15, (t / 50) * 100))}%">${t}°</div>
                <div class="bar-label">#${i + 1}</div>
            </div>`).join('');

        logBlock('Task 4: Temperature Analysis Using Arrays', [
            `Temperature Readings: ${readings.join(' ')}`, `Minimum Temperature: ${min}°C`,
            `Maximum Temperature: ${max}°C`, `Average Temperature: ${average}°C`,
            `Readings ≥ 40°C: ${hot.length}`, `Heatwave Condition Readings: ${hot.join(', ')}`,
        ]);
    }

    $('t4-push').addEventListener('click', () => {
        const value = parseFloat($('t4-new').value);
        if (isNaN(value)) return alert('Please enter a valid temperature value.');
        readings.push(value);
        $('t4-new').value = '';
        analyse();
    });
    $('t4-pop').addEventListener('click', () => { readings.pop(); analyse(); });
    $('t4-reset').addEventListener('click', () => { readings = [...DEFAULT_READINGS]; analyse(); });

    analyse();
}
