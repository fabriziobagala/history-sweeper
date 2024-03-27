/**
 * An object representing the available themes for the extension.
 * 
 * @typedef {Object} THEME
 * @property {string} AUTO - Represents the 'auto' theme. The 'auto' theme automatically adjusts based on the user's local time, switching to a light theme during the day and a dark theme at night.
 * @property {string} DARK - Represents the 'dark' theme. The 'dark' theme provides a dark color scheme, which can be easier on the eyes in low-light conditions.
 * @property {string} LIGHT - Represents the 'light' theme. The 'light' theme provides a light color scheme, which can be easier on the eyes in bright-light conditions.
 */
const THEME = {
    AUTO: 'auto',
    DARK: 'dark',
    LIGHT: 'light'
}

const SVG_LIGHT_THEME = `
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-brightness-high-fill" viewBox="0 0 16 16">
    <path d="M12 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708"/>
</svg>
`;

const SVG_DARK_THEME = `
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-moon-stars-fill" viewBox="0 0 16 16">
    <path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278"/>
    <path d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.73 1.73 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.73 1.73 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.73 1.73 0 0 0 1.097-1.097zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.16 1.16 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.16 1.16 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732z"/>
</svg>
`;

const SVG_AUTO_THEME = `
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-circle-half" viewBox="0 0 16 16">
    <path d="M8 15A7 7 0 1 0 8 1zm0 1A8 8 0 1 1 8 0a8 8 0 0 1 0 16"/>
</svg>
`;

/**
 * Saves the user's settings for data removal. It retrieves the period and removal 
 * options from the DOM and stores them in Chrome's sync storage.
 */
function saveSettings() {
    let period = document.getElementById('period').value;
    let removalOptions = getRemovalOptions();
    chrome.storage.sync.set({ 'period': period, 'removalOptions': removalOptions });
};

/**
 * Retrieves the removal options configured by the user.
 * 
 * @returns {Object} An object representing the removal options. Each property of the object corresponds to a type of browsing data, and the value of each property is a boolean indicating whether the user wants to remove that type of data.
 */
function getRemovalOptions() {
    return {
        "appcache": document.getElementById('appcache').checked,
        "cache": document.getElementById('cache').checked,
        "cacheStorage": document.getElementById('cacheStorage').checked,
        "cookies": document.getElementById('cookies').checked,
        "downloads": document.getElementById('downloads').checked,
        "fileSystems": document.getElementById('fileSystems').checked,
        "formData": document.getElementById('formData').checked,
        "history": document.getElementById('history').checked,
        "indexedDB": document.getElementById('indexedDB').checked,
        "localStorage": document.getElementById('localStorage').checked,
        "passwords": document.getElementById('passwords').checked,
        "serviceWorkers": document.getElementById('serviceWorkers').checked,
        "webSQL": document.getElementById('webSQL').checked
    };
}

/**
 * Sets the theme of the extension.
 *
 * @param {string} theme - The theme to set. Should be one of the values in the THEME object.
 */
function setTheme(theme) {
    // Get the theme icon element
    let themeIcon = document.getElementById('theme-icon');

    // Remove the 'active' class from all dropdown items
    document.querySelectorAll('.dropdown-item').forEach(item => {
        item.classList.remove('active');
    });

    // Set the theme based on the user's preference
    if (theme === THEME.AUTO) {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.body.dataset.bsTheme = THEME.DARK;
        } else {
            document.body.dataset.bsTheme = THEME.LIGHT;
        }
        themeIcon.innerHTML = SVG_AUTO_THEME;
        document.getElementById('auto-theme').classList.add('active');
    } else if (theme === THEME.DARK) {
        document.body.dataset.bsTheme = THEME.DARK;
        themeIcon.innerHTML = SVG_DARK_THEME;
        document.getElementById('dark-theme').classList.add('active');
    } else {
        document.body.dataset.bsTheme = THEME.LIGHT;
        themeIcon.innerHTML = SVG_LIGHT_THEME;
        document.getElementById('light-theme').classList.add('active');
    }
}

// Adds event listeners to the dropdown items
document.querySelectorAll('.dropdown-item').forEach(dropdownEl => {
    dropdownEl.addEventListener('click', (e) => {
        let element = e.currentTarget;
        let theme = element.dataset.theme;
        setTheme(theme);
        chrome.storage.sync.set({ 'theme': theme });
    });
});

// Translates the elements with the data-i18n attribute
document.querySelectorAll('[data-i18n]').forEach((htmlEl) => {
    const message = chrome.i18n.getMessage(htmlEl.dataset.i18n);
    if (message) {
        htmlEl.innerHTML = message;
    }
});

// Initializes the tooltips
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
if (tooltipTriggerList) {
    [...tooltipTriggerList].map(tooltipTriggerEl => {
        if (tooltipTriggerEl.dataset.i18nTooltip) {
            const tooltipOptions = {
                title: chrome.i18n.getMessage(tooltipTriggerEl.dataset.i18nTooltip),
                html: true,
            };
            return new bootstrap.Tooltip(tooltipTriggerEl, tooltipOptions);
        }
        else {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        }
    });
}

// Syncs the options with the storage
chrome.storage.sync.get(['theme', 'period', 'removalOptions'], (items) => {
    setTheme(items.theme);

    for (let id in items.removalOptions) {
        let checkbox = document.getElementById(id);
        if (checkbox) {
            checkbox.checked = items.removalOptions[id];
        }
    }

    let select = document.getElementById('period');
    if (select) {
        select.value = items.period;
    }
});

// Shows the info box when the info button is clicked
document.getElementById('info').addEventListener('click', () => {
    document.getElementById('info-box').classList.add('show');
});

// Hides the info box when the close button is clicked
document.getElementById('close-btn').addEventListener('click', () => {
    document.getElementById('info-box').classList.remove('show');
});

// Saves the settings when the user changes the period
document.getElementById('period').addEventListener('change', saveSettings);

// Saves the settings when the user changes the removal options
document.querySelectorAll('input[type=checkbox]').forEach(checkboxEl => {
    checkboxEl.addEventListener('change', (e) => {
        let removalOptions = getRemovalOptions();
        let allFalse = Object.values(removalOptions).every(option => option === false);
        if (allFalse) {
            e.target.checked = true;
            e.preventDefault();
        } else {
            saveSettings();
        }
    });
});
