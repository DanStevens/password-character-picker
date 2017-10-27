"use strict";
const storageArea = browser.storage.local;
const preferenceInputs = document.forms.preferences.querySelectorAll("input.pcp-preference");
console.log('preferenceInputs', preferenceInputs);

async function loadPreferencesAsync() {

    try {
        const result = await storageArea.get('preferences');

        console.log('storage.preferences', result.preferences);
        
        if (result.preferences) {
            for (let i = 0; i < preferenceInputs.length; i++) {
                let input = preferenceInputs[i];
                setInputValue(input, result.preferences[input.name]);
            }
        }
    } catch (error) {
        console.log("Error when retrieving preferences:", error);
    }
}

function getInputValue(input) {
/* eslint-disable indent */
    switch (input.type) {
        case 'checkbox':
            return input.checked;
        default:
            return input.value;
    }
/* eslint-enable indent */
}

function setInputValue(input, value) {
/* eslint-disable indent */
    switch (input.type) {
        case 'checkbox':
            return input.checked = value;
        default:
            return input.value = value;
    }
/* eslint-enable indent */
}

//function preferenceAccumulator(result, input) {
//    return result[input.name] = getInputValue(input);
//}

async function savePreferencesAsync(e) {
    e.preventDefault();
    
    //  var preferenceInputs = document.forms.preferences.querySelector("input.preference");
    console.log('preferenceInputs', preferenceInputs);

    const preferenceValues = {};
    for (let i = 0; i < preferenceInputs.length; i++) {
        let input = preferenceInputs[i];
        preferenceValues[input.name] = getInputValue(input);
    }

    //var preferenceValues = preferenceInputs.reduce(preferenceAccumulator, {});
    console.log('Saving to storage', preferenceValues);
    try {
        await storageArea.set({preferences: preferenceValues});
        document.getElementById('pcp-saved-notice').classList.remove('pcp-hidden');
    } catch (error) {
        console.log("Error when saving preferences:", error);
    }
}

document.addEventListener("DOMContentLoaded", loadPreferencesAsync);
document.forms.preferences.addEventListener("submit", savePreferencesAsync);