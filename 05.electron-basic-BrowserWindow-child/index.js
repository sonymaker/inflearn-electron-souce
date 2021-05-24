const {app, BrowserWindow} = require("electron");

app.on("ready", () => {
    console.log("ready");

    const parentWindow = new BrowserWindow({
        width: 600,
        height: 600
    });

    setTimeout(() => {
        const childWindow = new BrowserWindow({
            webPreferences: {
                nodeIntegration: true,//As of version 5, the default for nodeIntegration changed from true to false. You can enable it when creating the Browser Window:
                contextIsolation: false,//From Electron 12, it will be enabled by default.
                enableRemoteModule: true
            },
            width: 300,
            height: 300,
            parent: parentWindow,
            modal: true
        });

        childWindow.loadURL(`file://${__dirname}/child.html`);
    }, 3000);
});