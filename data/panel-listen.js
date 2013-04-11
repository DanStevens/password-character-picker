document.documentElement.addEventListener("setClipboard", function(event) {
  self.port.emit("setClipboard", event.detail.value);
}, false);