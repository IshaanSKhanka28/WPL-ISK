// Experiment 5 / Tasks 5 & 6 - Registration form with regular-expression validation
// (climate_validation). One rule per field returns an error message, or '' when valid.
import { $, selectField } from '../ui.js';
import { PATTERNS, isFuture, todayISO } from '../validators.js';

const AGE_GROUPS = ['Child (<18 Years)', 'Adult (18-59 Years)', 'Senior Citizen (60+ Years)'];
const CATEGORIES = ['General Public', 'Senior Citizen', 'Student', 'Outdoor Worker', 'Healthcare Worker', 'Government/Disaster Management', 'Other'];
const CHANNELS = ['SMS Alert', 'WhatsApp Messages', 'Email Broadcast', 'Voice Call Advisory', 'Push Notifications'];

const RULES = {
    userName: (v) => !v ? 'User Name is required.'
        : v.length < 3 ? 'Name must be at least 3 characters.'
        : !PATTERNS.alphaSpaces.test(v) ? 'Name must contain only alphabets and spaces.' : '',
    userId: (v) => !v ? 'User ID is required.'
        : !PATTERNS.climateUserId.test(v) ? 'User ID must follow format CLM-1234.' : '',
    mobile: (v) => !v ? 'Mobile number is required.'
        : !PATTERNS.digits10.test(v) ? 'Mobile number must be exactly 10 digits.'
        : !PATTERNS.indianMobile.test(v) ? 'Mobile number must start with 6, 7, 8, or 9.' : '',
    email: (v) => !v ? 'Email address is required.'
        : !PATTERNS.email.test(v) ? 'Please enter a valid email format.' : '',
    location: (v) => !v ? 'Location / City is required.'
        : !PATTERNS.alphaSpaces.test(v) ? 'Location must contain only alphabets and spaces.' : '',
    pin: (v) => !v ? 'PIN code is required.'
        : !PATTERNS.pinCode.test(v) ? 'PIN code must contain exactly 6 digits.' : '',
    ageGroup: (v) => v ? '' : 'Please select an age group.',
    category: (v) => v ? '' : 'Please select a user category.',
    channel: (v) => v ? '' : 'Please select a preferred alert channel.',
    regDate: (v) => !v ? 'Registration date is required.'
        : isFuture(v) ? 'Registration date cannot be a future date.' : '',
};

const SAMPLE = {
    userName: 'Rahul Sharma', userId: 'CLM-1234', mobile: '9876543210', email: 'rahul@gmail.com',
    location: 'Mumbai', pin: '400077', ageGroup: 'Adult (18-59 Years)', category: 'General Public',
    channel: 'SMS Alert', regDate: todayISO(),
};

const fieldId = (key) => `reg-${key}`;   // element ids are prefixed so they never clash with other forms

const textField = (key, label, type, placeholder, extra = '') =>
    `<div><label for="${fieldId(key)}">${label} <span class="required">*</span></label>
        <input type="${type}" id="${fieldId(key)}" placeholder="${placeholder}" ${extra}>
        <span class="error-message" id="${fieldId(key)}-error"></span></div>`;

export function mount(root) {
    root.innerHTML = `
        <form id="reg-form" novalidate>
            <fieldset>
                <legend>1. User Identification &amp; Contact Details</legend>
                <div class="field-grid">
                    ${textField('userName', 'User Name', 'text', 'e.g. Rahul Sharma')}
                    ${textField('userId', 'Climate User ID (CLM-1234)', 'text', 'e.g. CLM-1234')}
                    ${textField('mobile', 'Mobile Number (10 Digits)', 'tel', 'e.g. 9876543210', 'maxlength="10"')}
                    ${textField('email', 'Email Address', 'email', 'e.g. rahul@gmail.com')}
                </div>
            </fieldset>
            <fieldset>
                <legend>2. Location &amp; Demographic Profile</legend>
                <div class="field-grid cols-3">
                    ${textField('location', 'Location / City', 'text', 'e.g. Mumbai')}
                    ${textField('pin', 'PIN / Postal Code (6 Digits)', 'text', 'e.g. 400077', 'maxlength="6"')}
                    ${selectField(fieldId('ageGroup'), 'Age Group', '-- Select Age Group --', AGE_GROUPS)}
                </div>
            </fieldset>
            <fieldset>
                <legend>3. Alert Preferences &amp; Registration Metadata</legend>
                <div class="field-grid cols-3">
                    ${selectField(fieldId('category'), 'User Category', '-- Select Category --', CATEGORIES)}
                    ${selectField(fieldId('channel'), 'Preferred Alert Channel', '-- Select Channel --', CHANNELS)}
                    ${textField('regDate', 'Registration Date', 'date', '')}
                </div>
            </fieldset>
            <div class="btn-group">
                <button type="submit" class="btn-primary">Register for Early Warnings</button>
                <button type="reset" class="btn-secondary">Reset Form</button>
                <button type="button" class="btn-secondary" id="reg-sample">Load Rahul Sharma Example</button>
            </div>
        </form>
        <div id="reg-success" class="success-message" style="display: none; margin-top: 20px;">
            <h3>Registration Successful!</h3>
            <p>You are registered for Climate Intelligence Heatwave Monitoring and Early-Warning Alerts.</p>
            <div class="summary-card" id="reg-summary"></div>
        </div>`;

    const form = $('reg-form');
    const success = $('reg-success');
    const value = (key) => $(fieldId(key)).value.trim();

    // Validate one field, mark it valid / invalid and show its message.
    function check(key) {
        const error = RULES[key](value(key));
        $(fieldId(key)).classList.toggle('form-input-invalid', Boolean(error));
        $(fieldId(key)).classList.toggle('form-input-valid', !error);
        $(`${fieldId(key)}-error`).textContent = error;
        return !error;
    }

    Object.keys(RULES).forEach((key) => ['input', 'change'].forEach((type) => $(fieldId(key)).addEventListener(type, () => check(key))));

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const allValid = Object.keys(RULES).map(check).every(Boolean);   // map() first so every field shows its error

        if (!allValid) {
            success.style.display = 'none';
            form.querySelector('.form-input-invalid')?.focus();
            return;
        }
        $('reg-summary').innerHTML = `<strong>Verified Profile:</strong> ${value('userName')} (${value('userId')}) | ` +
            `Contact: ${value('mobile')} | Location: ${value('location')} - ${value('pin')}`;
        success.style.display = 'block';
        console.log('=== Tasks 5 & 6: Registration Verified Successfully ===');
        ['userName', 'userId', 'mobile', 'location', 'pin'].forEach((key) => console.log(`${key}: ${value(key)}`));
        success.scrollIntoView({ behavior: 'smooth' });
    });

    form.addEventListener('reset', () => setTimeout(() => {
        form.querySelectorAll('input, select').forEach((el) => el.classList.remove('form-input-valid', 'form-input-invalid'));
        form.querySelectorAll('.error-message').forEach((el) => { el.textContent = ''; });
        success.style.display = 'none';
    }, 0));

    $('reg-sample').addEventListener('click', () => {
        Object.entries(SAMPLE).forEach(([key, sample]) => { $(fieldId(key)).value = sample; });
        Object.keys(RULES).forEach(check);
    });

    $(fieldId('regDate')).value = todayISO();
}
