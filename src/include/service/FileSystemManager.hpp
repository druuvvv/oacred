#ifndef FILESYSTEMMANAGER_HPP
#define FILESYSTEMMANAGER_HPP

#include <string>
#include <vector>

class FileSystemManager {
public:
    virtual ~FileSystemManager() = default;

    /**
     * Adds a file or folder to the system.
     *
     * @param parentFolderName the name of the parent folder
     * @param name the name of the file or folder to add
     * @param isFolder true if adding a folder, false if adding a file
     */
    virtual void addFileOrFolder(const std::string &parentFolderName, const std::string &name, bool isFolder) = 0;

    /**
     * Moves a file or folder to a new location.
     *
     * @param sourceName the name of the file or folder to move
     * @param destinationFolderName the name of the destination folder
     */
    virtual void moveFileOrFolder(const std::string &sourceName, const std::string &destinationFolderName) = 0;

    /**
     * Lists the contents of a specific folder.
     *
     * @param folderName the name of the folder
     * @return a list of names of files and folders within the specified folder
     */
    virtual std::vector<std::string> listContents(const std::string &folderName) const = 0;

    /**
     * Returns the directory structure of each file and folder in the file system.
     *
     * @return a list representing the directory structure
     */
    virtual std::vector<std::string> listDirectoryStructure() const = 0;

    /**
     * Searches for an exact file match within a specific folder.
     *
     * @param folderName the name of the folder to search within
     * @param fileName the exact name of the file to search for
     * @return the name of the file if found, null otherwise
     */
    virtual std::string searchFileExactMatch(const std::string &folderName, const std::string &fileName) const = 0;

    /**
     * Searches for files by pattern within a specific folder.
     *
     * @param folderName the name of the folder to search within
     * @param pattern the pattern must be part(Contains) of the file name.
     * @return a list of file names that match the pattern
     */
    virtual std::vector<std::string>
    searchFileLikeMatch(const std::string &folderName, const std::string &pattern) const = 0;
};

#endif