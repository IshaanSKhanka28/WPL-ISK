// Loaded by every static page.
//  1. Builds the navigation bar from js/nav-links.js (active link = <body data-page="...">).
//  2. Mounts the Experiment 5 task widgets placed as <div data-task="..."></div>.
import { NAV_LINKS } from './nav-links.js';

const nav = document.querySelector('[data-site-nav]');
if (nav) {
    const current = document.body.dataset.page;
    nav.innerHTML = `<ul class="portal-nav-list">${NAV_LINKS.map(({ id, label, href }) =>
        `<li><a href="${href}"${id === current ? ' class="active"' : ''}>${label}</a></li>`).join('')}</ul>`;
}

const TASKS = {
    'temperature-analysis':    () => import('./tasks/temperature-analysis.js'),   // Task 1
    'risk-decision':           () => import('./tasks/risk-decision.js'),          // Task 2
    'climate-object':          () => import('./tasks/climate-object.js'),         // Task 3
    'temperature-array':       () => import('./tasks/temperature-array.js'),      // Task 4
    'registration-validation': () => import('./tasks/registration-validation.js'), // Tasks 5 & 6
};

document.querySelectorAll('[data-task]').forEach(async (el) => {
    (await TASKS[el.dataset.task]()).mount(el);
});
