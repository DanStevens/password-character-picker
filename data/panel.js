// Config
var cellSize = 15; // pixels

$(document).ready(function() {
  $('#indexTable').hide();
  $('#phraseField').on('keyup', phraseFieldKeyUpHander);
  $('#positionRow').height(cellSize);
  $('#characterRow').height(cellSize);
});

function phraseFieldKeyUpHander()
{
  $('#indexTable').hide();
  if ($('#phraseField').val() !== "") {
    generateIndexTable($('#phraseField').val());
    $('#indexTable').show();
  }
}

function generateIndexTable(phrase) {
  $('#positionRow').empty();
  $('#characterRow').empty(); 
  
  for (var i = 0; i < phrase.length; i++) {
    $('<td>' + (i + 1).toString() + '</td>').width(cellSize).appendTo('#positionRow');
    $('<td>' + phrase[i] + '</td>').width(cellSize).appendTo('#characterRow');
  }
  
  $('#indexTable').width(cellSize * phrase.length);
}
