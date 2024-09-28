"use strict";

const { Folder } = require("./models/folder");
const { File } = require("./models/file");



class FileSystemManager {
    /**
     * 
     * @param {string} rootName 
     */
    constructor(rootName) {
        this.root = new Folder(rootName);
    }


    /**
     * Adds a file or folder to the system.
     * 
     * @param {string} parentFolderName the name of the parent folder
     * @param {string} name the name of the file or folder to add
     * @param {boolean} isFolder true if adding a folder, false if adding a file
     */
    addFileOrFolder = (parentFolderName, name, isFolder) => {

    }


    /**
     * Moves a file or folder to a new location.
     * 
     * @param {string} sourceName the name of the file or folder to move
     * @param {string} destinationFolderName the name of the destination folder
     */
    moveFileOrFolder = (sourceName, destinationFolderName) => {

    }


    /**
     * Lists the contents of a specific folder.
     * 
     * @param {string} folderName the name of the folder
     * @returns {[]string} a list of names of files and folders within the specified folder
     */
    listContents = (folderName) => {

    }


    /**
     * Returns the directory structure of each file and folder in the file system.
     * 
     * @returns {[]string} a list representing the directory structure
     */
    listDirectoryStructure = () => {

    }


    /**
     * Searches for an exact file match within a specific folder.
     * 
     * @param {string} folderName 
     * @param {string} fileName 
     * @returns {string} the name of the file if found, null otherwise
     */
    searchFileExactMatch = (folderName, fileName) => {

    }


    /**
     * Searches for files by pattern within a specific folder.
     * 
     * @param {string} folderName the name of the folder to search within
     * @param {string} pattern the pattern must be part(Contains) of the file name.
     * @returns {[]string} a list of file names that match the pattern
     */
    searchFileLikeMatch = (folderName, pattern) => {

    }
}


module.exports = FileSystemManager;
