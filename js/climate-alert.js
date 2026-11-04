// jQuery experiment - client-side validation for climate-alert.html
// Uses jQuery selectors, events ('blur input', 'change', submit), DOM manipulation and class toggling.
// Each rule gets the trimmed value and returns an error message, or '' when the value is valid.
import { PATTERNS } from './validators.js';

const $ = window.jQuery;

const required = (message, then) => (v) => (v === '' ? message : then(v));
const number = (label, min, max, rangeMessage) => (v) => {
    const n = parseFloat(v);
    if (isNaN(n)) return `${label} must be a valid numeric value.`;
    return n < min || n > max ? rangeMessage : '';
};

// events = jQuery event list that triggers the check for that field.
const RULES = {
    observerName: { events: 'blur input', check: required('Observer Name is required and cannot be blank.', (v) =>
        !/^[A-Za-z\s]+$/.test(v) ? 'Observer Name must contain alphabetic characters and spaces only.'
            : v.length < 3 ? 'Observer Name must be at least 3 characters long.' : '') },
    mobileNumber: { events: 'blur input', check: required('Mobile Number is required.', (v) =>
        PATTERNS.indianMobile.test(v) ? '' : 'Enter a valid 10-digit Indian mobile number (starts with 6-9).') },
    emailAddress: { events: 'blur input', check: required('Email Address is required.', (v) =>
        PATTERNS.email.test(v) ? '' : 'Enter a valid email address (e.g., observer@somaiya.edu).') },
    locationArea: { events: 'blur input', check: required('Location / Area is required and cannot be blank.', (v) =>
        v.length < 3 ? 'Location name must be at least 3 characters.' : '') },
    stationId: { events: 'blur input', check: required('Weather Station ID is required.', (v) =>
        PATTERNS.weatherStationId.test(v) ? '' : 'Invalid Station ID format. Use code like WS-101 or AWS-5021.') },
    temperature: { events: 'blur input', check: required('Temperature reading is required.',
        number('Temperature', -10, 60, 'Temperature must be within a realistic range (-10°C to 60°C).')) },
    humidity: { events: 'blur input', check: required('Relative Humidity is required.',
        number('Humidity', 0, 100, 'Relative Humidity must be between 0% and 100%.')) },
    alertLevel: { events: 'change', check: required('Please select an alert level from the list.', () => '') },
    monitoringDate: { events: 'change blur', check: required('Monitoring Date is required.', () => '') },
};

const ALERT_BADGES = { Normal: 'badge-normal', Yellow: 'badge-yellow', Orange: 'badge-orange', Red: 'badge-red' };

$(function () {
    // Mark one field valid / invalid and show or hide its message.
    function validate(id) {
        const $field = $(`#${id}`);
        const message = RULES[id].check($.trim($field.val()));
        $field.toggleClass('input-error', Boolean(message)).toggleClass('input-success', !message);
        $(`#${id}-error`).text(message).toggle(Boolean(message));
        return !message;
    }

    // The notification preference is a radio group, so it is validated separately.
    function validateNotification() {
        const chosen = $('input[name="notificationPreference"]:checked').val();
        $('#notificationGroup').toggleClass('input-error', !chosen);
        $('#notificationPreference-error').text(chosen ? '' : 'Please select a preferred notification channel.').toggle(!chosen);
        return Boolean(chosen);
    }

    Object.entries(RULES).forEach(([id, { events }]) => $(`#${id}`).on(events, () => validate(id)));
    $('input[name="notificationPreference"]').on('change', validateNotification);

    $('#climateAlertForm').on('submit', function (event) {
        event.preventDefault();

        const results = Object.keys(RULES).map(validate);   // run every check so all errors show together
        results.push(validateNotification());

        if (!results.every(Boolean)) {
            $('#submissionSuccessCard').slideUp();
            $('.input-error').first().focus();
            return;
        }

        const alertLevel = $('#alertLevel').val();
        $('#summaryContent').html(`
            <div class="summary-item"><strong>Observer:</strong> ${$.trim($('#observerName').val())}</div>
            <div class="summary-item"><strong>Contact:</strong> ${$.trim($('#mobileNumber').val())} | ${$.trim($('#emailAddress').val())}</div>
            <div class="summary-item"><strong>Alert Dispatch:</strong> ${$('input[name="notificationPreference"]:checked').val()}</div>
            <div class="summary-item"><strong>Station ID:</strong> ${$.trim($('#stationId').val()).toUpperCase()}</div>
            <div class="summary-item"><strong>Location:</strong> ${$.trim($('#locationArea').val())}</div>
            <div class="summary-item"><strong>Observation Date:</strong> ${$('#monitoringDate').val()}</div>
            <div class="summary-item"><strong>Temperature:</strong> ${parseFloat($('#temperature').val()).toFixed(1)} &deg;C</div>
            <div class="summary-item"><strong>Relative Humidity:</strong> ${parseFloat($('#humidity').val()).toFixed(1)}%</div>
            <div class="summary-item wide">
                <strong>Current Status:</strong> <span class="badge-alert ${ALERT_BADGES[alertLevel] || 'badge-normal'}">${alertLevel} Alert Level</span>
            </div>`);

        $('#submissionSuccessCard').slideDown();
        $('html, body').animate({ scrollTop: $('#submissionSuccessCard').offset().top - 40 }, 400);
    });

    $('#btnReset').on('click', function () {
        setTimeout(function () {
            $('.error-msg').text('').hide();
            $('input, select').removeClass('input-error input-success');
            $('#notificationGroup').removeClass('input-error');
            $('#submissionSuccessCard').slideUp();
            $('#observerName').focus();
        }, 50);
    });
});
