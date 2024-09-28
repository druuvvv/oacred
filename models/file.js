"use strict";

const { FileSystemItem } = require("./file_system_item");


class File extends FileSystemItem {

    /**
     * 
     * @param {string} name
     */
    constructor(name) {
        super(name, false);
    }
}

module.exports.File = File;
