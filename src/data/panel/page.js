"use strict";
const storageArea = browser.storage.local;
let preferences = {
    maskPhraseInput: false,
    maskButtons: false,
    clearPhraseOnPageTurn: false
};
loadPreferences();

function loadPreferences() {
    // TODO
}

// Config
const cellSize = "24px";
const maskChar = '•';
const maskButtons = preferences.maskButtons;
console.log('maskButtons', maskButtons);

const positionRow = document.getElementById('positionRow');
const characterRow = document.getElementById('characterRow');
const phraseField = document.getElementById('phraseField');
const indexTable = document.getElementById('indexTable');
const indexTableContainer = document.getElementById('indexTableContainer');

positionRow.style.height = characterRow.style.height = cellSize;
phraseField.setAttribute("type", preferences.maskPhraseInput ? "password" : "text");
phraseField.addEventListener('keyup', phraseFieldKeyUpHander);
phraseFieldKeyUpHander();

function phraseFieldKeyUpHander() {
    indexTableContainer.style.display = 'none';
    if (phraseField.value !== "") {
        generateIndexTableContainer(phraseField.value);
        indexTableContainer.style.display = '';
    }
}

function generateIndexTableContainer(phrase) {
    positionRow.textContent = characterRow.textContent = '';

    phrase.split('').forEach(function (character, i) {
        const positionCell = createTableCell((i + 1).toString(), cellSize);
        positionRow.appendChild(positionCell);

        const characterCell = createTableCell("", cellSize);
        characterRow.appendChild(characterCell);

        if (maskButtons || character !== ' ') {
            const characterButton = document.createElement('button');
            characterButton.value = character;
            const characterButtonText = document.createTextNode(maskButtons ? maskChar : character);
            console.log('characterButtonText', characterButtonText);
            characterButton.appendChild(characterButtonText);
            characterButton.addEventListener('click', characterButtonClickHandler);
            characterCell.appendChild(characterButton);
        }
    });

    indexTable.style.width = cellSize * phrase.length;
}

function createTableCell(text, width) {
    const cell = document.createElement('td');
    cell.textContent = text;
    cell.style.width = width;
    return cell;
}

function characterButtonClickHandler() {
    // It's not possible to set the clipboard to arbitrary text in the WebExtensions API.
    // You can copy text from a non-hidden text input, so position it of screen so the user
    // cannot see it. https://stackoverflow.com/a/42416105/660896
    const tempInput = document.createElement('input');
    tempInput.style = "position: absolute; left: -1000px; top: -1000px";
    tempInput.value = this.value;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.remove(tempInput);
}