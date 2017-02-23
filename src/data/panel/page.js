"use strict";

// Config
var cellSize = "24px";
var maskChar = '•';
var maskButtons = false;

var positionRow = document.getElementById('positionRow');
var characterRow = document.getElementById('characterRow');
var phraseField = document.getElementById('phraseField');
var indexTable = document.getElementById('indexTable');
var indexTableContainer = document.getElementById('indexTableContainer');

//maskButtons = args.prefs.maskButtons;
positionRow.style.height = characterRow.style.height = cellSize;
//phraseField.setAttribute("type", args.prefs.maskPhraseInput ? "password" : "text");
phraseField.addEventListener('keyup', phraseFieldKeyUpHander);
phraseFieldKeyUpHander();

function phraseFieldKeyUpHander() {
    indexTableContainer.style.display = 'none';
    if (phraseField.value !== "") {
        generateindexTableContainer(phraseField.value);
        indexTableContainer.style.display = '';
    }
}

function generateindexTableContainer(phrase) {
    positionRow.textContent = characterRow.textContent = '';

    phrase.split('').forEach(function (character, i) {
        var positionCell = createTableCell((i + 1).toString(), cellSize);
        positionRow.appendChild(positionCell);

        var characterCell = createTableCell("", cellSize);
        characterRow.appendChild(characterCell);

        if (maskButtons || character !== ' ') {
            var characterButton = document.createElement('button');
            characterButton.value = character;
            var characterButtonText = document.createTextNode(maskButtons ? maskChar : character);
            characterButton.appendChild(characterButtonText);
            characterButton.addEventListener('click', characterButtonClickHandler);
            characterCell.appendChild(characterButton);
        }
    });

    indexTable.style.width = cellSize * phrase.length;
}

function createTableCell(text, width) {
    var cell = document.createElement('td');
    cell.textContent = text;
    cell.style.width = width;
    return cell;
}

function characterButtonClickHandler() {
    // It's not possible to set the clipboard to arbitrary text in the WebExtensions API.
    // You can copy text from a non-hidden text input, so position it of screen so the user
    // cannot see it
    var tempInput = document.createElement('input');
    tempInput.style = "position: absolute; left: -1000px; top: -1000px";
    tempInput.value = this.value;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.remove(tempInput);
}