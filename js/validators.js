// Regular expressions shared by the validation experiments (Expt 4, jQuery, Expt 5/6).
export const PATTERNS = {
    alphaSpaces: /^[A-Za-z ]+$/,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    digits10: /^\d{10}$/,
    indianMobile: /^[6-9]\d{9}$/,
    awsStationId: /^AWS\d{3,}$/i,        // AWS001
    weatherStationId: /^[A-Za-z]{2,4}-\d{3,5}$/, // WS-101, AWS-5021
    climateUserId: /^CLM-\d{4}$/,         // CLM-1234
    pinCode: /^\d{6}$/,
};

export const isFuture = (dateString) => {
    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);
    return new Date(dateString) > endOfToday;
};

export const todayISO = () => new Date().toISOString().split('T')[0];
