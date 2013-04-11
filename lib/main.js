var widgets = require("sdk/widget");
var data = require("sdk/self").data;
var panels = require("sdk/panel");
var clipboard = require("sdk/clipboard");

var panel = panels.Panel({
  width: 500,
  height: 175,
  contentURL: data.url("panel.html"),
  contentScriptFile: data.url("panel-listen.js")
});

panel.port.on("setClipboard", function(value) {
  clipboard.set(value, "text");
  console.log("Clipboard set to: " + value);
  panel.hide();
});

var widget = widgets.Widget({
  id: "widget",
  label: "Phrase Indexer",
  content: '<span style="font: 10pt Courier New, Monospace; -moz-user-select: none; cursor: default">PI</span>',
  panel: panel
});