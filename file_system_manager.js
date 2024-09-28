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
        
        // The Keys of this object will be the names of the files and folders
        // The values will be the actual File or Folder objects
        this.index = {};
        this.index[rootName.toLowerCase()] = this.root;
    }


    /**
     * Adds a file or folder to the system.
     * 
     * @param {string} parentFolderName the name of the parent folder
     * @param {string} name the name of the file or folder to add
     * @param {boolean} isFolder true if adding a folder, false if adding a file
     */
    addFileOrFolder = (parentFolderName, name, isFolder) => {
        let parentFolder = this.index[parentFolderName.toLowerCase()];
        if (!parentFolder) {
            // throw new Error(`Parent folder with name ${parentFolderName} does not exist`);
            return null;
        }
        
        // This isn't a limitation of usual filesystems, however our constrains 
        // depend on parentFolderName, so we can't have two folders with the same name
        // anywhere on the system
        if(this.index[name.toLowerCase()]) {
            return null;
            // throw new Error(`Folder/File with name ${name} already exists`);
        }

        if (isFolder) {


            let folder = new Folder(name);
            parentFolder.addItem(folder);

            // index is case insensitive, like our filesystem.
            this.index[name.toLowerCase()] = folder;
        } else {
            let file = new File(name);
            parentFolder.addItem(file);
            this.index[name.toLowerCase()] = file;
        }
    }


    /**
     * Moves a file or folder to a new location.
     * 
     * @param {string} sourceName the name of the file or folder to move
     * @param {string} destinationFolderName the name of the destination folder
     */
    moveFileOrFolder = (sourceName, destinationFolderName) => {
        let source = this.index[sourceName.toLowerCase()];
        if (!source) {
            return;
            // throw new Error(`File or folder with name ${sourceName} does not exist`);
        }

        let destinationFolder = this.index[destinationFolderName.toLowerCase()];
        if (!destinationFolder) {
            return null;
            // throw new Error(`Destination folder with name ${destinationFolderName} does not exist`);
        }

        source.parent.removeItem(source);
        destinationFolder.addItem(source);

    }


    /**
     * Lists the contents of a specific folder.
     * 
     * @param {string} folderName the name of the folder
     * @returns {[]string} a list of names of files and folders within the specified folder
     */
    listContents = (folderName) => {
        let folder = this.index[folderName];
        if (!folder) {
            return [];
            // throw new Error(`Folder with name ${folderName} does not exist`);
        }

        return folder.items.map(item => item.name);
    }


    /**
     * Returns the directory structure of each file and folder in the file system.
     * 
     * @returns {[]string} a list representing the directory structure
     */
    listDirectoryStructure = () => {
        // directory structure seems to be like a tree, where we have + for a folder
        // - for a file and the number of spaces indicates the depth of the file/folder

        let result = [];
        let listRecursive = (item, depth) => {
            let prefix = item.isFolder ? "+" : "-";
            let spaces = " ".repeat(2*depth);
            result.push(`${spaces}${prefix} ${item.name}`);
            
            if(!item.isFolder){
                return null;
            }

            for (let files of item.items) {
                listRecursive(files, depth + 1);
            }
        };

        listRecursive(this.root, 0);
        return result;
    }


    /**
     * Searches for an exact file match within a specific folder.
     * 
     * @param {string} folderName 
     * @param {string} fileName 
     * @returns {string} the name of the file if found, null otherwise
     */
    searchFileExactMatch = (folderName, fileName) => {
        let folder = this.index[folderName.toLowerCase()];
        if (!folder) {
            return null;
            // throw new Error(`Folder with name ${folderName} does not exist`);
        }

        let item = folder.getItem(fileName);
        if (!item) {
            return null;
        }

        return item.name;

    }


    /**
     * Searches for files by pattern within a specific folder.
     * 
     * @param {string} folderName the name of the folder to search within
     * @param {string} pattern the pattern must be part(Contains) of the file name.
     * @returns {[]string} a list of file names that match the pattern
     */
    searchFileLikeMatch = (folderName, pattern) => {
        let folder = this.index[folderName.toLowerCase()];
        if (!folder) {
            return null;
            // throw new Error(`Folder with name ${folderName} does not exist`);
        }

        let result = [];

        let searchRecursive = (folder) => {
            for (let item of folder.items) {
                if (item.name.toLowerCase().includes(pattern.toLowerCase())) {
                    result.push(item.name);
                }
                if (item.isFolder) {
                    searchRecursive(item);
                }
            }
        };

        searchRecursive(folder);
        return result;
    }
}


module.exports = FileSystemManager;
