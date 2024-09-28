"use strict";


class FileSystemItem {

    /**
     * 
     * @param {string} name
     * @param {boolean} isFolder
     */
    constructor(name, isFolder) {
        this.name = name;
        this.isFolder = isFolder;
        
        this.parent = null;
    }
}

module.exports.FileSystemItem = FileSystemItem;
