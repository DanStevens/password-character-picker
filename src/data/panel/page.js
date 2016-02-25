// Config
var cellSize = "24px";
var maskChar = '•';
var maskButtons = false;

var positionRow = document.getElementById('positionRow');
var characterRow = document.getElementById('characterRow');
var phraseField = document.getElementById('phraseField');
var indexTable = document.getElementById('indexTable');
var indexTableContainer = document.getElementById('indexTableContainer');

addon.port.on("show", function (args) {
    maskButtons = args.prefs.maskButtons;
    positionRow.style.height = characterRow.style.height = cellSize;
    phraseField.setAttribute("type", args.prefs.maskPhraseInput ? "password" : "text");
    phraseField.addEventListener('keyup', phraseFieldKeyUpHander);
    phraseFieldKeyUpHander();
});

addon.port.on("clearPhraseInput", function (args) {
    phraseField.value = '';
});

function phraseFieldKeyUpHander() {
    indexTableContainer.style.display = 'none';
    if (phraseField.value !== "") {
        generateindexTableContainer(phraseField.value);
        indexTableContainer.style.display = '';
    }
}

function generateindexTableContainer(phrase) {
    positionRow.innerHTML = characterRow.innerHTML = '';
    
    phrase.split('').forEach(function (character, i) {
        var positionCell = createTableCell((i + 1).toString(), cellSize);
        positionRow.appendChild(positionCell);
        
        var characterCell = createTableCell("", cellSize);
        characterRow.appendChild(characterCell);
        
        if (maskButtons || character !== ' ') {
            var characterButton = document.createElement('button');
            characterButton.value = character;
            characterButton.innerHTML = maskButtons ? maskChar : character;
            characterButton.addEventListener('click', characterButtonClickHandler);
            characterCell.appendChild(characterButton);
        }
    });

    indexTable.style.width = cellSize * phrase.length;
}

function createTableCell(contents, width) {
    var cell = document.createElement('td');
    cell.innerHTML = contents;
    cell.style.width = width;
    return cell;
}

function characterButtonClickHandler() {
    addon.port.emit("setClipboard", this.value);
}