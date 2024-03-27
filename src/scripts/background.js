/**
 * Calculates the time since a certain period. It takes a period as a 
 * parameter, which is a string that can be 'hour', 'day', 'week', 
 * 'month', or 'year'.
 * 
 * @param {string} period - The period to calculate the time since. Can be 'hour', 'day', 'week', 'month', or 'year'.
 * @returns {Date} A Date object representing the time since the specified period.
 */
function getSinceTime(period) {
    let millisecondsPerHour = 1000 * 60 * 60;
    let millisecondsPerDay = millisecondsPerHour * 24;
    let millisecondsPerWeek = millisecondsPerDay * 7;
    let millisecondsPerMonth = millisecondsPerWeek * 4;
    let now = (new Date()).getTime();

    switch (period) {
        case 'hour':
            return now - millisecondsPerHour;
        case 'day':
            return now - millisecondsPerDay;
        case 'week':
            return now - millisecondsPerWeek;
        case 'month':
            return now - millisecondsPerMonth;
        case 'beginning':
            return 0;
        default:
            return now - millisecondsPerHour;
    }
};

// Sets default settings for period and removal options in Chrome's sync archive, 
// only on first installation of the extension.
chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason === "install") {
        let theme = 'auto';
        let period = 'hour';
        let removalOptions = {
            "appcache": true,
            "cache": true,
            "cacheStorage": true,
            "cookies": true,
            "downloads": false,
            "fileSystems": false,
            "formData": false,
            "history": true,
            "indexedDB": false,
            "localStorage": false,
            "passwords": false,
            "serviceWorkers": false,
            "webSQL": false
        };
        chrome.storage.sync.set({ 'theme': theme, 'period': period, 'removalOptions': removalOptions });
    }
});

// Removes the browsing data when the browser starts
chrome.runtime.onStartup.addListener(() => {
    chrome.storage.sync.get(['period', 'removalOptions'], (items) => {
        let since = getSinceTime(items.period);
        chrome.browsingData.remove({
            "since": since,
            "originTypes": {
                "unprotectedWeb": true
            }
        },
            items.removalOptions);
    });
});
