const {app, BrowserWindow} = require('electron');

app.on("ready", () => {
    const mainWindow = new BrowserWindow({
        width: 600,
        height: 600,
        show: false,
        webPreferences: {
            nodeIntegration: true,//As of version 5, the default for nodeIntegration changed from true to false. You can enable it when creating the Browser Window:
            contextIsolation: false,//From Electron 12, it will be enabled by default.
            enableRemoteModule: true
        }
    });

    mainWindow.loadURL(`file://${__dirname}/index.html`);

    mainWindow.on("ready-to-show", () => {
        console.log("ready-to-show");
        mainWindow.show();
    }).on("show", () => {
        console.log("show");
    }).on("hide", () => {
        console.log("hide");
    }).on("close", () => {
        console.log("close");
    }).on("closed", () => {
        console.log("closed");
    }).on("focus", () => {
        console.log("focus");
    }).on("blur", () => {
        console.log("blur");
    }).on("move", () => {
        console.log("move");
    }).on("moved", () => {
        console.log("moved");
    });
});