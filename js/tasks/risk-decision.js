// Experiment 5 / Task 2 - Heatwave risk and early-warning decision (heatwave_warning)
// if / else-if / else chain with relational (>=, <) and logical (&&) operators.
import { $, num, text, setBadge, logBlock, field, statCard, resultCard, expectedOutput } from '../ui.js';

// Decision rules, checked top to bottom - the first one that matches wins.
const RULES = [
    { when: (t) => t >= 40, risk: 'SEVERE', badge: 'badge-severe', color: '#c62828',
      rec: 'Severe Heatwave Warning', desc: 'Severe heatwave condition detected. Red Alert advisory issued.' },
    { when: (t, h) => t >= 38 && h >= 60, risk: 'HIGH', badge: 'badge-high', color: '#e65100',
      rec: 'High Heat Risk – Issue Warning', desc: 'High temperature combined with humidity >= 60%. Issue Heatwave Warning.' },
    { when: (t) => t >= 35 && t < 38, risk: 'MODERATE', badge: 'badge-mod', color: '#f57f17',
      rec: 'Moderate Heat Risk – Monitor Conditions', desc: 'Temperature between 35°C and 38°C. Monitor environment.' },
    { when: (t, h, forecast) => forecast >= 40, risk: 'EARLY WARNING', badge: 'badge-info', color: '#1565c0',
      rec: 'Early Warning – Prepare for Heatwave', desc: 'Forecast indicates impending temperature surge above 40°C.' },
    { when: () => true, risk: 'NORMAL', badge: 'badge-normal', color: '#2e7d32',
      rec: 'Normal – Continue Monitoring', desc: 'Temperature < 35°C. Routine climate monitoring.' },
];

const PRESETS = [
    { label: 'Pune (High Risk)', values: ['Pune', 39, 65, 38, false] },
    { label: 'Nagpur (Severe)', values: ['Nagpur', 44, 30, 45, true] },
    { label: 'Jaipur (Early Warning)', values: ['Jaipur', 34, 40, 42, false] },
];

export function mount(root) {
    root.innerHTML = `
        <div class="field-grid">
            ${field('t2-location', 'Location / City:', 'text', 'Pune')}
            ${field('t2-temp', 'Current Temperature (°C):', 'number', 39, 'step="0.5"')}
            ${field('t2-humidity', 'Humidity (%):', 'number', 65, 'min="0" max="100"')}
            ${field('t2-forecast', 'Forecast Temperature (°C):', 'number', 38, 'step="0.5"')}
        </div>
        <label class="check-row"><input type="checkbox" id="t2-vulnerable">
            Enable Vulnerable Population Advisory (Children, Elderly &amp; Outdoor Workers)</label>
        <div class="btn-group">
            <button type="button" class="btn-primary" id="t2-evaluate">Evaluate Decision Rules</button>
            ${PRESETS.map((p, i) => `<button type="button" class="btn-secondary" data-preset="${i}">Preset: ${p.label}</button>`).join('')}
        </div>
        ${resultCard('Early-Warning Assessment', 't2-badge',
            statCard('Location', 't2-res-loc', 'sm') + statCard('Current Temp', 't2-res-temp') +
            statCard('Humidity', 't2-res-humidity') + statCard('Forecast Temp', 't2-res-forecast'),
            `<div class="rec-box" id="t2-rec-box">
                <h4 id="t2-rec"></h4><p id="t2-desc"></p>
                <div class="vuln-advice" id="t2-vuln">⚠ Vulnerable Population Alert: Urgent hydration &amp; indoor cooling mandated.</div>
            </div>`)}
        ${expectedOutput('Standard Expected Output (Pune):',
            'Location: Pune | Temperature: 39°C | Humidity: 65% | Risk Level: HIGH | Recommendation: Issue Heatwave Warning')}`;

    function evaluate() {
        const location = $('t2-location').value.trim() || 'Pune';
        const [temp, humidity, forecast] = ['t2-temp', 't2-humidity', 't2-forecast'].map(num);
        const rule = RULES.find((r) => r.when(temp, humidity, forecast));

        text('t2-res-loc', location);
        text('t2-res-temp', `${temp}°C`);
        text('t2-res-humidity', `${humidity}%`);
        text('t2-res-forecast', `${forecast}°C`);
        setBadge('t2-badge', rule.badge, rule.risk);
        $('t2-rec-box').style.borderLeftColor = rule.color;
        text('t2-rec', `Recommendation: ${rule.rec}`);
        text('t2-desc', rule.desc);
        $('t2-vuln').style.display = $('t2-vulnerable').checked ? 'block' : 'none';

        logBlock('Task 2: Heatwave Risk Decision', [
            `Location: ${location} | Temp: ${temp}°C | Humidity: ${humidity}% | Risk: ${rule.risk} | Rec: ${rule.rec}`,
        ]);
    }

    ['t2-temp', 't2-humidity', 't2-forecast'].forEach((id) => $(id).addEventListener('input', evaluate));
    $('t2-vulnerable').addEventListener('change', evaluate);
    $('t2-evaluate').addEventListener('click', evaluate);

    root.querySelectorAll('[data-preset]').forEach((button) => button.addEventListener('click', () => {
        const [location, temp, humidity, forecast, vulnerable] = PRESETS[button.dataset.preset].values;
        $('t2-location').value = location;
        $('t2-temp').value = temp;
        $('t2-humidity').value = humidity;
        $('t2-forecast').value = forecast;
        $('t2-vulnerable').checked = vulnerable;
        evaluate();
    }));

    evaluate();
}
