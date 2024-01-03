const { app, BrowserWindow } = require('electron');
//const path = require('node:path')
let appWindow;

function initWindow() {
    appWindow = new BrowserWindow({
        // fullscreen: true,
        height: 800,
        width: 1000,
        webPreferences: {
            nodeIntegration: true,
            //preload: path.join(__dirname, 'preload.js')
        },
    });

    // Electron Build Path
    const indexPath = `file://${__dirname}/dist/snake-game/index.html`;
    appWindow.loadURL(indexPath);

    appWindow.setMenuBarVisibility(false)

    // Initialize the DevTools.
     appWindow.webContents.openDevTools()

    appWindow.on('closed', function () {
        appWindow = null;
    });
}

app.on('ready', initWindow);

// Close when all windows are closed.
app.on('window-all-closed', function () {
    // On macOS specific close process
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function () {
    if (appWindow === null) {
        initWindow();
    }
});