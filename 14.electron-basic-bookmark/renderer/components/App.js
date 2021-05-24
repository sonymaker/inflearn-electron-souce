import React, { useState, useEffect } from "react";
import { ipcRenderer, clipboard } from "electron";
import Item from "./Item";
import Button from "./Button";

const App = () => {
    const [data, setData] = useState([]),
        [type, setType] = useState("home");

    useEffect(() => {
        ipcRenderer.on("update", (event, _data) => {
            setData(_data);
        });

        document.addEventListener("paste", () => {
            ipcRenderer.send("paste", {
                type,
                url: clipboard.readText()
            });
        });
    }, []);

    return (
        <div className="window">
            <header className="toolbar toolbar-header">
                <div className="toolbar-actions">
                    <h1 className="title">DAEHO's Bookmark App</h1>
                    <div className="btn-group">
                        <Button type="home" icon="icon-home" active={type === "home"} setType={setType} />
                        <Button type="github" icon="icon-github" active={type === "github"} setType={setType} />
                    </div>
                </div>
            </header>
            <div className="window-content">
                <ul className="list-group" id="list-group">
                    {data
                        .filter((item, idx) => {
                            item.removeId = idx;
                            return item.type === type;
                        })
                        .map((item, idx) => (
                            <Item key={item.removeId} url={item.url} title={item.title} removeId={item.removeId}/>
                        ))}
                </ul>
            </div>
        </div>
    );
};

export default App;
