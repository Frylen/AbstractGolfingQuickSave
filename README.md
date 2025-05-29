# Abstract Golfing Quick Saves
Well, this game is delisted on Steam, so it is not available for purchase anymore. However, some people might 
have it sitting in their library. If you are one of those, this might be your way to get all the games'
achievements without getting frustrated beyond all reason. 

This mod allows for quick saves. There are some things you should keep in mind:
- You can only have a single checkpoint at all times.
- The quick save persists between game restarts.
- Quick Save Location (Windows): 
`%Userprofile%/AppData/Local/AbstractGolfing/UserData/Default/IndexedDB/chrome-extension_*/*.log`

## Installation
To install this mod, you can either download the provided release file or patch the game yourself. We will 
provide instructions for both ways here.

### Prepatched file
1. Download the patched file from the GitHub releases.
2. Open your game file location (`Steam/steamapps/common/AbstractGolfing` or click on the gear icon in your Steam 
   Library > Manage > Browse local files).
3. Replace the original `package.nw` with the downloaded one. 
4. Start the game and check if everything works by setting a checkpoint via `F5` and loading it with `F9`.
5. If there are any errors, you can open the developer console with `F12`.

### Manual Patching
1. Rename `package.nw` to `package.zip` and open it.
2. Copy `c2runtime.js` to somewhere outside the zip.
3. Open `c2runtime.js` in any text editor.
4. Add the following parts below `use strict;`:
```js
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
```
5. Save the edited `c2runtime.js`.
6. In your zip program, delete the original `c2runtime.js` and replace it with your edited one.
7. Close your zip program and rename the zip back to `package.nw`.
8. Start the game and check if everything works by setting a checkpoint via `F5` and loading it with `F9`.
9. If there are any errors, you can open the developer console with `F12`.
