const {app, BrowserWindow} = require('electron');

app.on("ready", () => {
    const firstWindow = new BrowserWindow({
            webPreferences: {
                nodeIntegration: true,//As of version 5, the default for nodeIntegration changed from true to false. You can enable it when creating the Browser Window:
                contextIsolation: false,//From Electron 12, it will be enabled by default.
                enableRemoteModule: true
            }
        }),
        secondWindow = new BrowserWindow({
            webPreferences: {
                nodeIntegration: true,//As of version 5, the default for nodeIntegration changed from true to false. You can enable it when creating the Browser Window:
                contextIsolation: false,//From Electron 12, it will be enabled by default.
                enableRemoteModule: true
            }
        });

        firstWindow.loadURL(`file://${__dirname}/index.html`);
        secondWindow.loadURL(`file://${__dirname}/index.html`);
});