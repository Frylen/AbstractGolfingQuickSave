// create the database for our saves
var request = indexedDB.open("_C2SaveStates", 2);
request.onupgradeneeded = function(event) {
    var db = event.target.result;
    if (!db.objectStoreNames.contains("saves")) {
        // the game assumes these names, so DO NOT edit them
        db.createObjectStore("saves", {keyPath: "slot"});
        console.log("Object store 'saves' created.");
    }
};

request.onsuccess = function(event) {
    console.log("Database upgrade successful.");
};

request.onerror = function(event) {
    console.error("Error upgrading database:", event.target.error);
};

// add event listener for quick save hotkeys
document.addEventListener("keydown", (keyEvent) => {
    // the method this is based on is `d.prototype.KU` and should be in line 4314 (pretty printed)
    // `d` being an instance of the C2Runtime
    if (keyEvent.key === "F5") {
        // quick save 
        window.cr_getC2Runtime().Io = "mysave";
    } else if (keyEvent.key === "F9") {
        // quick load
        window.cr_getC2Runtime().Ik = "mysave";
    }
});