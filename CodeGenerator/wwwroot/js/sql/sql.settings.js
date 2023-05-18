var lsettingsjson = {};
var ldatajson = [];

var keysettings = "ideaslokas-modelsql-settings";
var keydatabase = "ideaslokas-modelsql-database";

$(document).ready(function () {
    var ltempsettings = getLocalData(keysettings);
    var ltempdatabase = getLocalData(keydatabase);

    if (ltempsettings == null)
        $.getJSON("json/settings.json", function (json) {
            lsettingsjson = json;
            setLocalData(keysettings, json);
            console.log("settings by server");
        });
    else {
        lsettingsjson = ltempsettings;
        console.log("settings by local");
    }

    if (ltempdatabase != null) {
        ldatajson = ltempdatabase;
        drawTables();
        console.log("database by local");
    }
});

function setLocalData(key, value) {
    window.localStorage.setItem(key, JSON.stringify(value));
}

function getLocalData(key) {
    var linfo = window.localStorage.getItem(key);

    if (typeof linfo === "undefined")
        return null;
    else
        return JSON.parse(linfo);
}