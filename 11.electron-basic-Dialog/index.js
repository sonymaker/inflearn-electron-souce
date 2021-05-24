const {app, BrowserWindow} = require('electron');

app.on("ready", () => {
    console.log("ready");

    const mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,//As of version 5, the default for nodeIntegration changed from true to false. You can enable it when creating the Browser Window:
            contextIsolation: false,//From Electron 12, it will be enabled by default.
            enableRemoteModule: true
        }
    });

    mainWindow.loadURL(`file://${__dirname}/index.html`);

    mainWindow.webContents.openDevTools();
});