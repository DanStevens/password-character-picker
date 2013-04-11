var widgets = require("sdk/widget");
var data = require("sdk/self").data;
var panels = require("sdk/panel");
var clipboard = require("sdk/clipboard");

var panel = panels.Panel({
  width: 500,
  height: 160,
  contentURL: data.url("panel.html"),
  contentScriptFile: data.url("panel-listen.js")
});

panel.port.on("setClipboard", function(value) {
  clipboard.set(value, "text");
  panel.hide();
});

var widget = widgets.Widget({
  id: "widget",
  label: "Phrase Indexer",
  contentURL: data.url("widget.png"),
  panel: panel
});