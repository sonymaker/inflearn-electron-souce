const {app, BrowserWindow} = require("electron");

app.on("ready", () => {
    console.log("ready");
    //app이 뜬 다음에 화면이 표시되기까지의 delaytime동안 빈 화면을 보여주지 않고 준비가 완료된 후 app이 표시되도록 하는 방법
    
    const mainWindow = new BrowserWindow({
        width: 600,
        height: 600,
        show: false
    });

    mainWindow.loadURL("https://github.com");
    
    mainWindow.once("ready-to-show", () => {
        mainWindow.show();
    });
});