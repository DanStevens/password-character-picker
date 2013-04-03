$(document).ready(function() {
  $('phraseField').on('keyup', phraseFieldKeyUpHander);
  phraseFieldKeyUpHander();
});

function phraseFieldKeyUpHander()
{
    $('indexTable').hide();
    if ($('phraseField').val() !== "") {
        generateIndexTable(phraseField.val());
        $('indexTable').show();
    }
}

function generateIndexTable(phrase) {
    console.log("Generating table using '" + phrase + "'");
}