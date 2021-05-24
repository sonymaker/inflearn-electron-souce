const {app, BrowserWindow} = require("electron");

app.on("ready", () => {
    console.log("ready");

    const mainWindow = new BrowserWindow({
        width: 600,
        height: 600,
        frame: false
    });

    mainWindow.loadURL(`file://${__dirname}/index.html`);

    //macOS에서는 titleBarStyle: 'hidden 또는 hiddenInset' 옵션 사용 가능
});