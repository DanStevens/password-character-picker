var phraseField = document.getElementById("phraseField");

self.port.on("maskPhraseInput", function(val) {
  phraseField.setAttribute("type", val ? "password" : "text");
});

document.documentElement.addEventListener("setClipboard", function (event) {
  self.port.emit("setClipboard", event.detail.value);
}, false);