const electron = require('electron')
const { app, BrowserWindow } = require('electron')

if (handleSquirrelEvent()) {
    return;
}

function createWindow(displays) {
    let widthOfScreen = 0
    let heightOfScreen = 0;
    for (var i in displays) {
        widthOfScreen += displays[i].bounds.width
        heightOfScreen += displays[i].bounds.height
    }
    let win = new BrowserWindow({
        height: 40,
        width: 115,
        x: widthOfScreen - 110,
        y: (heightOfScreen - 40) / 2,
        frame: false,
        alwaysOnTop: true,
        transparent: true,
        webPreferences: {
            nodeIntegration: false
        },
        show: false
    })
    win.loadFile('index.html')
    win.once('ready-to-show', () => {
        win.show()
    })
    win.on('closed', () => {
        win = null;
    })
}

app.on('ready', () => {
    let displays = electron.screen.getAllDisplays();
    createWindow(displays)
})

function handleSquirrelEvent() {
    if (process.argv.length === 1) {
        return false;
    }

    const ChildProcess = require('child_process');
    const path = require('path');

    const appFolder = path.resolve(process.execPath, '..');
    const rootAtomFolder = path.resolve(appFolder, '..');
    const updateDotExe = path.resolve(path.join(rootAtomFolder, 'Update.exe'));
    const exeName = path.basename(process.execPath);

    const spawn = function (command, args) {
        let spawnedProcess, error;

        try {
            spawnedProcess = ChildProcess.spawn(command, args, { detached: true });
        } catch (error) { }

        return spawnedProcess;
    };

    const spawnUpdate = function (args) {
        return spawn(updateDotExe, args);
    };

    const squirrelEvent = process.argv[1];
    switch (squirrelEvent) {
        case '--squirrel-install':
        case '--squirrel-updated':
            // Install desktop and start menu shortcuts
            spawnUpdate(['--createShortcut', exeName]);
            setTimeout(app.quit, 1000);
            return true;

        case '--squirrel-uninstall':
            // Remove desktop and start menu shortcuts
            spawnUpdate(['--removeShortcut', exeName]);
            setTimeout(app.quit, 1000);
            return true;

        case '--squirrel-obsolete':
            // This is called on the outgoing version of your app before
            // we update to the new version - it's the opposite of
            // --squirrel-updated
            app.quit();
            return true;
    }
};