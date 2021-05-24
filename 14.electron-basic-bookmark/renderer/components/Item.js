import React from "react";
import {shell, ipcRenderer} from "electron";

const Item = (item) => {
    function onOpenButtonClick(event) {
        shell.openExternal(event.target.innerHTML);
    }

    function onRemoveButtonClick(event) {
        ipcRenderer.send("remove", item.removeId);
    }

    return (
        <li className="list-group-item">
            <div className="media-body">
                <strong>
                    <a href="#" onClick={onOpenButtonClick} style={{cursor: "pointer"}}>
                        {item.url}
                    </a>
                </strong>
                <p>
                    {item.title}
                    <span className="icon icon-trash pull-right" onClick={onRemoveButtonClick} ></span>
                </p>
            </div>
        </li>
    );
};

export default Item;
