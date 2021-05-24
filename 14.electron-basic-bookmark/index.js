const {
    app,
    BrowserWindow,
    ipcMain,
    dialog,
    Tray,
    Menu,
    clipboard,
} = require("electron");
const request = require("superagent");
const getTitle = require("get-title");
const fs = require("fs");
const path = require("path");
const DATA_PATH = path.join(__dirname, "./data.json");
const data = require("./data.json");
let mainWindow = null;
let tray = null;

const context = [
    {
        label: app.getName(),
        subMenu: [
            { role: "paste" },
            { type: "separator" },
            {
                label: "Quit",
                click: () => {
                    app.quit();
                },
            },
        ],
    },
];

const template = [
    {
        label: "Open",
        click: () => {
            mainWindow.show();
        },
    },
    {
        label: "Save",
        submenu: [
            {
                label: "Home",
                click: () => {
                    save({
                        type: "home",
                        url: clipboard.readText(),
                    });
                },
            },
            {
                label: "GitHub",
                click: () => {
                    save({
                        type: "github",
                        url: clipboard.readText(),
                    });
                },
            },
        ],
    },
    {
        type: "separator",
    },
    {
        label: "Quit",
        click: () => {
            app.quit();
        },
    },
];

app.on("ready", () => {
    Menu.setApplicationMenu(Menu.buildFromTemplate(context));
    tray = new Tray(path.join(__dirname, "./KIS3.0.ico"));
    tray.setContextMenu(Menu.buildFromTemplate(template));

    switch (process.platform) {
        case "dirwin": {
            tray.on("right-click", () => {
                toggle();
            });
            break;
        }
        case "win32": {
            tray.on("click", () => {
                toggle();
            });
            break;
        }
        default: {
            break;
        }
    }

    const bounds = tray.getBounds();

    mainWindow = new BrowserWindow({
        width: 400,
        height: 400,
        x: Math.round(bounds.x + bounds.width / 2 - 200),
        y:
            process.platform === "darwin"
                ? bounds.y + bounds.height + 10
                : bounds.y - 400 - 10,
        frame: false,
        acceptFirstMouse: true,
        show: false,
        webPreferences: {
            nodeIntegration: true, //As of version 5, the default for nodeIntegration changed from true to false. You can enable it when creating the Browser Window:
            contextIsolation: false, //From Electron 12, it will be enabled by default.
            enableRemoteModule: true,
        },
        //resizable: false,
        //movable: false,
    });

    mainWindow.once("ready-to-show", () => {
        mainWindow.webContents.send("update", data);
    });

    if (process.platform === "darwin") {
        mainWindow.on("blur", () => {
            mainWindow.hide();
        });
    }

    mainWindow.loadURL(`file://${__dirname}/index.html`);
    //mainWindow.webContents.openDevTools();

    ipcMain.on("paste", (event, item) => {
        if (
            item.url.indexOf("http://") > -1 ||
            item.url.indexOf("https://") > -1
        ) {
            const type = item.type,
                url = item.url;

            request.get(url).end((err, res) => {
                const contents = res.text;

                getTitle(contents).then((title) => {
                    data.push({ type, url, title });
                    fs.writeFileSync(
                        DATA_PATH,
                        JSON.stringify(data, null, "\t")
                    );
                    mainWindow.webContents.send("update", data);
                });
            });
        } else {
            dialog.showErrorBox("경고", "유효한 URL이 아닙니다.");
        }
    });

    ipcMain.on("remove", (event, removeId) => {
        data.splice(removeId, 1);
        fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, "\t"));
        mainWindow.webContents.send("update", data);
    });
});

function toggle() {
    if (mainWindow.isVisible()) {
        mainWindow.hide();
    } else {
        mainWindow.show();
    }
}

function save(item) {
    if (item.url.indexOf("http://") > -1 || item.url.indexOf("https://") > -1) {
        const type = item.type,
            url = item.url;

        request.get(url).end((err, res) => {
            const contents = res.text;

            getTitle(contents).then((title) => {
                data.push({ type, url, title });
                fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, "\t"));
                mainWindow.webContents.send("update", data);
            });
        });
    } else {
        dialog.showErrorBox("경고", "유효한 URL이 아닙니다.");
    }
}
