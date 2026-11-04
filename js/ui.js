// Small DOM / markup helpers shared by the task widgets in js/tasks/.
export const $ = (id) => document.getElementById(id);
export const num = (id) => parseFloat($(id).value) || 0;
export const text = (id, value) => { $(id).textContent = value; };
export const signed = (n) => (n >= 0 ? '+' : '') + n.toFixed(1);

export const setBadge = (id, cls, label) => {
    $(id).className = `status-badge ${cls}`;
    $(id).textContent = label;
};

export const logBlock = (title, lines) => {
    console.log(`=== ${title} ===`);
    lines.forEach((line) => console.log(line));
};

/* ---- markup builders ---- */
export const field = (id, label, type, value, attrs = '') =>
    `<div><label for="${id}">${label}</label><input type="${type}" id="${id}" value="${value}" ${attrs}></div>`;

export const statCard = (label, id, cls = '') =>
    `<div class="stat-card"><div class="stat-label">${label}</div><div class="stat-value ${cls}" id="${id}"></div></div>`;

export const resultCard = (title, badgeId, tiles, extra = '') =>
    `<div class="result-card">
        <h3><span>${title}</span><span id="${badgeId}" class="status-badge"></span></h3>
        <div class="stat-grid">${tiles}</div>${extra}
    </div>`;

export const expectedOutput = (title, output) =>
    `<div class="expected-output"><strong>${title}</strong><pre>${output}</pre></div>`;

export const selectField = (id, label, placeholder, options) =>
    `<div><label for="${id}">${label} <span class="required">*</span></label>
        <select id="${id}"><option value="">${placeholder}</option>${options.map((o) => `<option value="${o}">${o}</option>`).join('')}</select>
        <span class="error-message" id="${id}-error"></span></div>`;
