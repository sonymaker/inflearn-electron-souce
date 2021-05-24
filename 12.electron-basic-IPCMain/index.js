const { app, BrowserWindow, ipcMain } = require("electron");

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

    ipcMain.on(/*channel 설정*/"send_async_channel", (event, message) => {
        console.log(message);
        //event.sender.send("reply_async_channel", "이것은 main 프로세스에서 보낸 비동기 메세지입니다.");
        mainWindow.webContents.send("reply_async_channel", "이것은 main 프로세스에서 보낸 비동기 회신메세지입니다.");
    });

    ipcMain.on(/*channel 설정*/"send_sync_channel", (event, message) => {
        console.log(message);

        event.returnValue = "이것은 main 프로세스에서 보낸 동기 회신메세지입니다.";
    });

    setInterval(() => {
        mainWindow.webContents.send("reply_async_channel", "이것은 main 프로세스에서 보낸 비동기 메세지입니다.");
    }, 3000);
});