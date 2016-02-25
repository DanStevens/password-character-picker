"use strict";
var ui = require("sdk/ui");
var data = require("sdk/self").data;
var panels = require("sdk/panel");
var clipboard = require("sdk/clipboard");
var prefs = require("sdk/simple-prefs");
var tabs = require("sdk/tabs");
var panel, widget;

panel = panels.Panel({
    width: 500,
    height: 175,
    contentURL: data.url("panel/page.html"),
    onHide: function () {
        widget.state('window', {checked: false});
    }
});

widget = ui.ToggleButton({
    id: "widget",
    label: "Password Character Picker",
    icon: {
        "16": "./widget16.png",
        "32": "./widget32.png",
        "48": "./widget48.png",
        "64": "./widget64.png"
    },
    onChange: function (state) {
        if (state.checked) {
            panel.show({position: widget});
        }
    }
});

function init() {
    panel.on("show", function () {
        panel.port.emit("show", prefs);
    });

    panel.port.on("setClipboard", function (value) {
        clipboard.set(value, "text");
        console.log("Clipboard set to: " + value);
        panel.hide();
    });

    tabs.on("ready", function (tab) {
        if (prefs.prefs.clearPhraseOnPageTurn && tab === tabs.activeTab) {
            panel.port.emit("clearPhraseInput");
        }
    });
}

init();
