"use strict";
const storageArea = browser.storage.local;
const preferenceInputs = document.forms.preferences.querySelectorAll("input.preference");
console.log('preferenceInputs', preferenceInputs);

function loadPreferences() {
    function storageReceived(storage) {
        console.log('storage.preferences', storage.preferences);

        for (let i = 0; i < preferenceInputs.length; i++) {
            let input = preferenceInputs[i];
            setInputValue(input, storage.preferences[input.name]);
        }
    }

    function onError(error) {
        console.log("Error when retrieving preferences:", error);
    }

    const storageGetResult = storageArea.get('preferences');
    storageGetResult.then(storageReceived, onError);
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

function savePreferences(e) {
    function storageSaved() {
        document.getElementById('pcp-saved-notice').classList.remove('pcp-hidden');
    }

    function onError(error) {
        console.log("Error when saving preferences:", error);
    }

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
    let storageSetResult = storageArea.set({preferences: preferenceValues});
    storageSetResult.then(storageSaved, onError);
}

document.addEventListener("DOMContentLoaded", loadPreferences);
document.forms.preferences.addEventListener("submit", savePreferences);