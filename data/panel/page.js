// Config
var cellSize = 24; // pixels

$(document).ready(function() {
  $('#indexTableContainer').hide();
  $('#phraseField').on('keyup', phraseFieldKeyUpHander);
  $('#positionRow').height(cellSize);
  $('#characterRow').height(cellSize);
});

function phraseFieldKeyUpHander()
{
  $('#indexTableContainer').hide();
  if ($('#phraseField').val() !== "") {
    generateindexTableContainer($('#phraseField').val());
    $('#indexTableContainer').show();
  }
}

function generateindexTableContainer(phrase) {
  $('#positionRow').empty();
  $('#characterRow').empty(); 
  
  for (var i = 0; i < phrase.length; i++) {
    $('<td>' + (i + 1).toString() + '</td>').width(cellSize).appendTo('#positionRow');
    var charTd = $('<td>').width(cellSize);
    $('#characterRow').append(charTd);
    if (phrase[i] !== ' ') {
      var charButton = $('<button>')
        .val(phrase[i])
        .text(phrase[i])
        .click(characterButtonClickHandler);
      charTd.append(charButton);
    }
  }
  
  $('#indexTable').width(cellSize * phrase.length);
}

function characterButtonClickHandler() {
  var event = document.createEvent('CustomEvent');
  event.initCustomEvent("setClipboard", true, true, { value: $(this).val() });
  document.documentElement.dispatchEvent(event);
}
