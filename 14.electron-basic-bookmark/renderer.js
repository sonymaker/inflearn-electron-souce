const { ipcRenderer, clipboard, shell } = require("electron"),
    btnHome = document.querySelector("#btn_home"),
    btnGitHub = document.querySelector("#btn_github");

let type = "home",
    data = [];

//버튼 초기화
btnHome.classList.add("active");
btnGitHub.classList.remove("active");

btnHome.addEventListener("click", () => {
    if (type !== "home") {
        btnHome.classList.add("active");
        btnGitHub.classList.remove("active");
        type = "home";

        update();
    }
});

btnGitHub.addEventListener("click", () => {
    if (type !== "github") {
        btnGitHub.classList.add("active");
        btnHome.classList.remove("active");
        type = "github";

        update();
    }
});

ipcRenderer.on("update", (event, _data) => {
    data = _data;
    update();
});

function update() {
    const items = data.filter((item, idx) => {
        item.removeId = idx;
        return item.type === type;
    });

    const arrListHTML = items.map((item) => {
            return `
                <li class="list-group-item">
                    <div class="media-body">
                        <strong><a href="#">${item.url}</a></strong>
                        <p>
                            ${item.title}
                            <span class="icon icon-trash pull-right"></span>
                        </p>
                    </div>
                </li>
            `;
        }),
        strHTML = arrListHTML.join("");

    document.querySelector("#list-group").innerHTML = strHTML;

    document.querySelectorAll(".icon-trash").forEach((removeDOM, idx) => {
        removeDOM.addEventListener("click", () => {
            ipcRenderer.send("remove", items[idx].removeId);
        });
    });

    document
        .querySelectorAll(".list-group-item a")
        .forEach((removeDOM, idx) => {
            removeDOM.addEventListener("click", (event) => {
                shell.openExternal(event.target.innerHTML);
            });
        });
}

document.addEventListener("paste", () => {
    const item = {
        type,
        url: clipboard.readText(),
    };

    ipcRenderer.send("paste", item);
});
