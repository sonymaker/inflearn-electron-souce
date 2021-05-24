const {app, BrowserWindow} = require("electron");

console.log("start");

/*
 * 애플리케이션이 기본적인 시작 준비를 마치면 발생하는 이벤트입니다. Windows, Linux 운영체제에서의 will-finish-launching 이벤트는 ready 이벤트와 동일합니다. macOS에서의 이벤트는 NSApplication의 applicationWillFinishLaunching에 대한 알림으로 표현됩니다. 대개 이곳에서 open-file과 open-url 이벤트 리스너를 설정하고 crash reporter와 auto updater를 시작합니다.
 * 대부분의 경우, 모든 것을 ready 이벤트 핸들러 안에서 해결해야 합니다.
 */
app.on("will-finish-launching", () => {
    console.log("will-finish-launching");
});

//Electron이 초기화를 끝냈을 때 발생하는 이벤트
app.on("ready", (launchInfo) => {
    console.log(`ready : ${JSON.stringify(launchInfo)}`);

    const mainWindow = new BrowserWindow({
        width: 600,
        height: 600
    });
});

/*
 * 모든 윈도우가 종료되었을 때 발생하는 이벤트입니다.
 * 만약 이 이벤트를 구독하지 않은 상태로 모든 윈도우가 닫혔을 때의 기본 동작은 앱을 종료하는 것입니다. 하지만, 이 이벤트를 구독하면, 앱을 종료할지 다른 일을 할지 제어할 수 있습니다. 만약 사용자가 Cmd + Q를 입력했거나 개발자가 app.quit()를 호출했다면, Electron은 먼저 모든 윈도우의 종료를 시도하고 will-quit 이벤트를 발생시킵니다. 그리고 will-quit 이벤트가 발생했을 땐 window-all-closed 이벤트가 발생하지 않습니다.
 * 역자주: 이 이벤트는 말 그대로 현재 애플리케이션에서 윈도우만 완전히 종료됬을 때 발생하는 이벤트입니다. 따라서 애플리케이션을 완전히 종료하려면 이 이벤트에서 app.quit()를 호출해 주어야 합니다.
 */
app.on("window-all-closed", (event) => {
    //event.preventDefault();
    console.log("window-all-closed");
    app.quit();
});

//애플리케이션 윈도우들이 닫히기 시작할 때 발생하는 이벤트. event.preventDefault() 호출은 이벤트의 기본 동작을 방지하기 때문에 이를 통해 애플리케이션의 종료를 방지할 수 있음.
app.on("before-quit", (event) => {
    //event.preventDefault();
    console.log("before-quit");
});

//모든 윈도우들이 종료되고 애플리케이션이 종료되기 시작할 때 발생하는 이벤트. event.preventDefault() 호출을 통해 애플리케이션의 종료를 방지할 수 있음.
app.on("will-quit", (event) => {
    //event.preventDefault();
    console.log("will-quit");
});

//애플리케이션이 종료될 때 발생하는 이벤트
app.on("quit", (event, exitCode) => {
    console.log(`quit : ${exitCode}`);
});

//mac os일때만 발생하므로 멀티플래폼 app개발 시에는 사용하지 말 것
app.on("activate", (event, hasVisibleWindow) => {
    //event.preventDefault();
    console.log(`activate : ${hasVisibleWindow}`);
});