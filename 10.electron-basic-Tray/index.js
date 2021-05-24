const {app, BrowserWindow, Tray, Menu} = require("electron");

//작업표시줄 영역에 표시되는 App의 아이콘을 Tray라고 함
const trayContetMenuTemplate = [
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

let mainWindow = null,
    tray = null

app.on("ready", () => {
    console.log("ready");

    mainWindow = new BrowserWindow();

    tray = new Tray(`${__dirname}/KIS3.0.ico`);

    tray.on("click", ()=>{
        console.log("click");
    });

    tray.on("right-click", ()=>{
        console.log("right-click");
    });

    tray.setContextMenu(Menu.buildFromTemplate(trayContetMenuTemplate));
});