const { app, BrowserWindow } = require("electron");

const menuTemplate = [
    {
        label: "First",
        submenu: [
            {
                label: "First-sub1",
                click: () => {
                    console.log("First-sub1 click");
                    app.quit();
                },
            },
        ],
    },
    {
        label: "Second",
        submenu: [
            {
                label: "Second-sub1",
            },
            {
                label: "Second-sub2",
            },
            {
                type: "separator",
            },
            {
                label: "Second-sub3",
                click() {
                    console.log("Second-sub1 click");
                },
            },
        ],
    },
];

//Menu 개발시에는 mac용과 window용을 구분해서 개발해야 한다.
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
    /*
    const menu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(menu);

    console.log(Menu.getApplicationMenu());
    */
});
