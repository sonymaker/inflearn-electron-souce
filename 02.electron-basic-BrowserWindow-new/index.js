const {app, BrowserWindow} = require("electron");

app.on("ready", () => {
    console.log("ready");

    const mainWindow = new BrowserWindow({
        width: 600,
        height: 600
    });

    mainWindow.loadURL("https://www.naver.com");

    const secondWindow = new BrowserWindow({
        width: 300,
        height: 300,
        x: 0,//app이 표시될 left값
        y: 0,//app이 표시될 top값
        minWidth: 200,
        minHeight: 200,
        maxWidth: 500,
        maxHeight: 500,
        movable: false,//마우스로 이동시킬 수 있는지 여부 설정
        title: "second"//title 설정
    });

    secondWindow.loadURL(`file://${__dirname}/second.html`);
});