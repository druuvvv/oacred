"use strict";

const { FileSystemItem } = require("./file_system_item");

class Folder extends FileSystemItem {

    /**
     * 
     * @param {string} name
     */
    constructor(name) {
        super(name, true)
        this.items = [];
    }

    /**
     * 
     * @param {FileSystemItem} fsItem 
     */
    addItem(fsItem) {
        if (!fsItem.name) {
            return;
        }
        this.items.push(fsItem);
        fsItem.parent = this;
    }

    /**
     * 
     * @param {FileSystemItem} item 
     */
    removeItem(fsItem) {
        this.items = this.items.filter(item => item.name !== fsItem.name);
    }


    /**
     * 
     * @param {string} name 
     */
    getItem(name) {
        for (const fsItem of this.items) {
            if (fsItem.name === name) {
                return fsItem;
            }
        }
        return null;
    }
}

module.exports.Folder = Folder;